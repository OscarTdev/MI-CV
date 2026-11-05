import base64
import json
import socket
from typing import Any

import cv2
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import uvicorn


HOST = "0.0.0.0"
PORT = 8000

app = FastAPI()

# --- Intenta cargar MediaPipe, si falla usa fallback OpenCV ---
USE_MEDIAPIPE = False
mp_hands = None
mp_drawing = None
hands = None

try:
    import mediapipe as mp  # type: ignore

    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils
    hands = mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=1,
        min_detection_confidence=0.7,
        min_tracking_confidence=0.5,
    )
    USE_MEDIAPIPE = True
    print("[hand_control] MediaPipe cargado correctamente")
except Exception as exc:  # noqa: BLE001
    print(f"[hand_control] MediaPipe no disponible ({exc}), usando fallback OpenCV")


viewers: set[WebSocket] = set()
clients: dict[str, WebSocket] = {}
gesture_states: dict[str, dict[str, Any]] = {}


def get_local_ip() -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        sock.close()


def default_gesture_state() -> dict[str, Any]:
    return {
        "cursor_x": 50,
        "cursor_y": 50,
        "click": False,
        "scroll": 0,
        "pinch_locked": False,
        "gesture": "waiting",
    }


# --- MediaPipe path ---


def get_finger_positions(landmarks):
    return {
        "thumb_tip": np.array([landmarks[4].x, landmarks[4].y]),
        "index_tip": np.array([landmarks[8].x, landmarks[8].y]),
        "index_pip": np.array([landmarks[6].x, landmarks[6].y]),
        "middle_tip": np.array([landmarks[12].x, landmarks[12].y]),
        "middle_pip": np.array([landmarks[10].x, landmarks[10].y]),
    }


def detect_gesture_mediapipe(hand_landmarks, state: dict[str, Any]) -> dict[str, Any]:
    points = get_finger_positions(hand_landmarks.landmark)

    index_extended = points["index_tip"][1] < points["index_pip"][1]
    middle_extended = points["middle_tip"][1] < points["middle_pip"][1]
    dist_thumb_index = float(np.linalg.norm(points["thumb_tip"] - points["index_tip"]))

    state["cursor_x"] = int(points["index_tip"][0] * 100)
    state["cursor_y"] = int(points["index_tip"][1] * 100)
    state["scroll"] = 0

    if dist_thumb_index < 0.05:
        if not state["pinch_locked"]:
            state["click"] = True
            state["pinch_locked"] = True
        else:
            state["click"] = False
    else:
        state["click"] = False
        if dist_thumb_index > 0.08:
            state["pinch_locked"] = False

    if index_extended and middle_extended:
        state["gesture"] = "pointer"
    elif index_extended and not middle_extended:
        state["gesture"] = "scroll_up"
        state["scroll"] = -2
    elif not index_extended and middle_extended:
        state["gesture"] = "scroll_down"
        state["scroll"] = 2
    else:
        state["gesture"] = "fist"

    return state


# --- OpenCV fallback: detección de piel por HSV ---


def skin_mask(frame) -> np.ndarray:
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    lower_skin = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin = np.array([50, 255, 255], dtype=np.uint8)
    mask = cv2.inRange(hsv, lower_skin, upper_skin)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    return mask


def detect_gesture_opencv(frame, state: dict[str, Any]) -> dict[str, Any]:
    h, w = frame.shape[:2]
    mask = skin_mask(frame)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        state = reset_gesture_state(state, "waiting")
        return state, None

    # Tomar el contorno más grande (asumimos que es la mano)
    largest = max(contours, key=cv2.contourArea)
    area = cv2.contourArea(largest)

    if area < 3000:
        state = reset_gesture_state(state, "waiting")
        return state, None

    x, y, cw, ch = cv2.boundingRect(largest)
    center_x = int((x + cw / 2) / w * 100)
    center_y = int((y + ch / 2) / h * 100)

    state["cursor_x"] = center_x
    state["cursor_y"] = center_y
    state["scroll"] = 0
    state["click"] = False

    # Clasificar gesto básico por aspecto del contorno
    aspect_ratio = cw / ch if ch > 0 else 1

    if aspect_ratio < 0.85:
        # Mano más alta que ancha -> dedos extendidos (pointer)
        state["gesture"] = "pointer"
    elif aspect_ratio > 1.15:
        # Mano más ancha que alta -> posible puño o mano abierta
        if area > 12000:
            state["gesture"] = "fist"
        else:
            state["gesture"] = "pointer"
    else:
        # Relación cuadrada -> índice extendido (scroll)
        if center_y < 45:
            state["gesture"] = "scroll_up"
            state["scroll"] = -2
        elif center_y > 55:
            state["gesture"] = "scroll_down"
            state["scroll"] = 2
        else:
            state["gesture"] = "pointer"

    # Dibujar contorno en el frame para el monitor remoto
    cv2.drawContours(frame, [largest], -1, (0, 255, 0), 2)
    cv2.circle(frame, (int((x + cw / 2)), int((y + ch / 2))), 5, (0, 255, 0), -1)

    return state, frame


def reset_gesture_state(state: dict[str, Any], gesture: str = "waiting") -> dict[str, Any]:
    state["click"] = False
    state["scroll"] = 0
    state["gesture"] = gesture
    return state


# --- Frame encode/decode ---


def decode_frame(frame_b64: str):
    encoded = frame_b64.split(",", 1)[-1]
    frame_bytes = base64.b64decode(encoded)
    frame_array = np.frombuffer(frame_bytes, dtype=np.uint8)
    return cv2.imdecode(frame_array, cv2.IMREAD_COLOR)


def encode_frame(frame) -> str:
    ok, buffer = cv2.imencode(".jpg", frame)
    if not ok:
        raise ValueError("No se pudo codificar la imagen")
    return base64.b64encode(buffer).decode("utf-8")


# --- WebSocket helpers ---


async def safe_send(websocket: WebSocket, payload: dict[str, Any]) -> bool:
    try:
        await websocket.send_text(json.dumps(payload))
        return True
    except Exception:
        return False


async def broadcast_to_viewers(payload: dict[str, Any]) -> None:
    stale = []
    for viewer in list(viewers):
        if not await safe_send(viewer, payload):
            stale.append(viewer)
    for viewer in stale:
        viewers.discard(viewer)


def process_user_frame(client_id: str, frame_b64: str) -> tuple[dict[str, Any], str]:
    frame = decode_frame(frame_b64)
    if frame is None:
        raise ValueError("No se pudo decodificar el frame recibido")

    frame = cv2.flip(frame, 1)

    state = gesture_states.setdefault(client_id, default_gesture_state())
    state["click"] = False
    state["scroll"] = 0

    processed_frame = frame

    if USE_MEDIAPIPE:
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            state = detect_gesture_mediapipe(hand_landmarks, state)
            processed_frame = frame
        else:
            state = reset_gesture_state(state, "waiting")
    else:
        state, processed_frame = detect_gesture_opencv(frame, state)

    gesture_states[client_id] = state
    return dict(state), encode_frame(processed_frame)


MONITOR_HTML = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitor Hand Control</title>
    <style>
        body {
            margin: 0;
            font-family: system-ui, sans-serif;
            background: #0f172a;
            color: white;
            display: grid;
            place-items: center;
            min-height: 100vh;
            padding: 24px;
        }
        .panel {
            width: min(900px, 100%);
            background: #111827;
            border: 1px solid #334155;
            border-radius: 18px;
            padding: 20px;
        }
        img {
            width: 100%;
            border-radius: 14px;
            background: #020617;
            display: block;
        }
        .meta {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            flex-wrap: wrap;
        }
        .badge {
            background: #1e293b;
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="panel">
        <div class="meta">
            <div class="badge" id="status">Esperando usuario...</div>
            <div class="badge" id="clientId">Sin sesion activa</div>
            <div class="badge" id="gesture">Sin gesto</div>
        </div>
        <img id="frame" alt="Vista remota del usuario" />
    </div>

    <script>
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const ws = new WebSocket(`${protocol}://${window.location.host}/connect`);
        const status = document.getElementById('status');
        const clientId = document.getElementById('clientId');
        const gesture = document.getElementById('gesture');
        const frame = document.getElementById('frame');

        ws.addEventListener('open', () => {
            ws.send(JSON.stringify({ role: 'viewer' }));
            status.textContent = 'Monitor conectado';
        });

        ws.addEventListener('message', (event) => {
            const payload = JSON.parse(event.data);

            if (payload.type === 'snapshot') {
                status.textContent = 'Usuario interactuando';
                clientId.textContent = `Sesion: ${payload.client_id}`;
                gesture.textContent = `Gesto: ${payload.gesture_state?.gesture || 'sin dato'}`;
                frame.src = `data:image/jpeg;base64,${payload.frame}`;
                return;
            }

            if (payload.type === 'status') {
                status.textContent = payload.message;
            }
        });

        ws.addEventListener('close', () => {
            status.textContent = 'Monitor desconectado';
        });
    </script>
</body>
</html>
"""


@app.get("/")
async def root():
    return HTMLResponse(
        """
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><title>Hand Control Server</title></head>
        <body style="font-family: system-ui, sans-serif; padding: 24px;">
            <h1>Hand Control Server</h1>
            <p>Este servidor recibe la camara del usuario, procesa gestos y expone un monitor.</p>
            <p>Abre <a href="/viewer">/viewer</a> para ver al usuario que esta interactuando.</p>
        </body>
        </html>
        """
    )


@app.get("/viewer")
async def viewer():
    return HTMLResponse(MONITOR_HTML)


@app.websocket("/connect")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    client_id = str(id(websocket))
    role = "controller"

    try:
        join_payload = json.loads(await websocket.receive_text())
        role = join_payload.get("role", "controller")

        if role == "viewer":
            viewers.add(websocket)
            await safe_send(websocket, {"type": "status", "message": "Esperando frames del usuario..."})
            while True:
                await websocket.receive_text()
        else:
            clients[client_id] = websocket
            gesture_states[client_id] = default_gesture_state()
            await safe_send(
                websocket,
                {
                    "status": "connected",
                    "client_id": client_id,
                    "gesture_state": dict(gesture_states[client_id]),
                },
            )

            while True:
                payload = json.loads(await websocket.receive_text())
                action = payload.get("action")

                if action == "stop":
                    break

                if action != "frame":
                    continue

                state, processed_frame = process_user_frame(client_id, payload["frame"])
                response = {
                    "status": "tracking",
                    "client_id": client_id,
                    "gesture_state": state,
                    "frame": processed_frame,
                }

                await safe_send(websocket, response)
                await broadcast_to_viewers({"type": "snapshot", **response})
    except (WebSocketDisconnect, json.JSONDecodeError, KeyError, ValueError) as error:
        if role != "viewer":
            await safe_send(
                websocket,
                {
                    "status": "error",
                    "message": str(error) if str(error) else "Conexion cerrada",
                },
            )
    finally:
        viewers.discard(websocket)
        clients.pop(client_id, None)
        gesture_states.pop(client_id, None)


if __name__ == "__main__":
    local_ip = get_local_ip()
    print("Hand control listo")
    print(f"Servidor local: http://localhost:{PORT}")
    print(f"Servidor LAN:   http://{local_ip}:{PORT}")
    print(f"Monitor LAN:    http://{local_ip}:{PORT}/viewer")
    uvicorn.run(app, host=HOST, port=PORT)
