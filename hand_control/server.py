import cv2
import mediapipe as mp
import asyncio
import json
import numpy as np
import base64
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import uvicorn
import threading

app = FastAPI()

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5
)

cap = None
clients = set()
gesture_state = {
    "cursor_x": 50,
    "cursor_y": 50,
    "click": False,
    "scroll": 0,
    "pinch_locked": False,
    "gesture": "waiting"
}
lock = threading.Lock()
running = False


def get_finger_positions(landmarks):
    return {
        "thumb_tip": np.array([landmarks[4].x, landmarks[4].y]),
        "index_tip": np.array([landmarks[8].x, landmarks[8].y]),
        "index_pip": np.array([landmarks[6].x, landmarks[6].y]),
        "middle_tip": np.array([landmarks[12].x, landmarks[12].y]),
        "middle_pip": np.array([landmarks[10].x, landmarks[10].y]),
        "ring_tip": np.array([landmarks[16].x, landmarks[16].y]),
        "pinky_tip": np.array([landmarks[20].x, landmarks[20].y]),
        "wrist": np.array([landmarks[0].x, landmarks[0].y]),
    }


def detect_gesture(hand_landmarks):
    global gesture_state
    
    points = get_finger_positions(hand_landmarks.landmark)
    
    index_extended = points["index_tip"][1] < points["index_pip"][1]
    middle_extended = points["middle_tip"][1] < points["middle_pip"][1]
    
    dist_thumb_index = np.linalg.norm(points["thumb_tip"] - points["index_tip"])
    
    with lock:
        gesture_state["cursor_x"] = int(points["index_tip"][0] * 100)
        gesture_state["cursor_y"] = int(points["index_tip"][1] * 100)
        gesture_state["scroll"] = 0
        
        if dist_thumb_index < 0.05:
            if not gesture_state["pinch_locked"]:
                gesture_state["click"] = True
                gesture_state["pinch_locked"] = True
        else:
            gesture_state["click"] = False
            if dist_thumb_index > 0.08:
                gesture_state["pinch_locked"] = False
        
        if index_extended and middle_extended:
            gesture_state["gesture"] = "pointer"
        elif index_extended and not middle_extended:
            gesture_state["gesture"] = "scroll_up"
            gesture_state["scroll"] = -2
        elif not index_extended and middle_extended:
            gesture_state["gesture"] = "scroll_down"
            gesture_state["scroll"] = 2
        else:
            gesture_state["gesture"] = "fist"
            gesture_state["scroll"] = 0
    
    return gesture_state


def reset_gesture_state(gesture="waiting"):
    with lock:
        gesture_state["click"] = False
        gesture_state["scroll"] = 0
        gesture_state["gesture"] = gesture


async def websocket_handler(websocket):
    clients.add(websocket)
    try:
        await websocket.send(json.dumps({"status": "connected", "gesture_state": dict(gesture_state)}))
        
        async for message in websocket:
            data = json.loads(message)
            if data.get("action") == "start":
                await process_camera(websocket)
            elif data.get("action") == "stop":
                break
    except WebSocketDisconnect:
        pass
    finally:
        clients.discard(websocket)


async def process_camera(websocket):
    global cap, running
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)

    if not cap.isOpened():
        await websocket.send(json.dumps({
            "status": "error",
            "message": "No se pudo abrir la camara."
        }))
        if cap:
            cap.release()
            cap = None
        return

    running = True
    
    try:
        while running and cap.isOpened():
            success, frame = cap.read()
            if not success:
                await websocket.send(json.dumps({
                    "status": "error",
                    "message": "No se pudo leer la camara."
                }))
                break
            
            frame = cv2.flip(frame, 1)
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(rgb_frame)
            
            gesture_data = {"status": "tracking"}
            
            with lock:
                gesture_data["gesture_state"] = dict(gesture_state)
            
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                    gesture_data["gesture_state"] = detect_gesture(hand_landmarks)
            else:
                reset_gesture_state("waiting")
                with lock:
                    gesture_data["gesture_state"] = dict(gesture_state)
            
            _, buffer = cv2.imencode('.jpg', frame)
            frame_b64 = base64.b64encode(buffer).decode('utf-8')
            gesture_data["frame"] = frame_b64
            
            await websocket.send(json.dumps(gesture_data))
            await asyncio.sleep(0.05)
    finally:
        running = False
        if cap:
            cap.release()
            cap = None
        reset_gesture_state("stopped")
        try:
            await websocket.send(json.dumps({"status": "stopped", "gesture_state": dict(gesture_state)}))
        except RuntimeError:
            pass


@app.websocket("/connect")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await websocket_handler(websocket)


@app.get("/")
async def root():
    return HTMLResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Hand Control</title>
    </head>
    <body>
        <h1>Hand Control Server</h1>
        <p>Conecta desde la página principal del CV</p>
    </body>
    </html>
    """)
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
