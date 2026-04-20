from pathlib import Path
import json
import socket

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import uvicorn


BASE_DIR = Path(__file__).resolve().parent
HOST = "0.0.0.0"
PORT = 8000

app = FastAPI()

broadcaster: WebSocket | None = None
viewers: set[WebSocket] = set()
client_roles: dict[WebSocket, str] = {}

pages = {
    "broadcaster": (BASE_DIR / "index.html").read_text(encoding="utf-8"),
    "viewer": (BASE_DIR / "viewer.html").read_text(encoding="utf-8"),
}


def get_local_ip() -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        sock.close()


async def safe_send(websocket: WebSocket, payload: dict) -> bool:
    try:
        await websocket.send_text(json.dumps(payload))
        return True
    except Exception:
        await unregister_client(websocket)
        return False


async def unregister_client(websocket: WebSocket) -> None:
    global broadcaster

    role = client_roles.pop(websocket, None)
    viewers.discard(websocket)

    if broadcaster is websocket:
        broadcaster = None
        stale_viewers = list(viewers)
        viewers.clear()
        for viewer in stale_viewers:
            client_roles.pop(viewer, None)
            try:
                await viewer.close()
            except Exception:
                pass
        return

    if role == "viewer" and broadcaster is not None:
        await safe_send(
            broadcaster,
            {"type": "viewer-left", "viewer_id": str(id(websocket))},
        )


@app.get("/")
async def get_broadcaster_page():
    return HTMLResponse(pages["broadcaster"])


@app.get("/viewer")
async def get_viewer_page():
    return HTMLResponse(pages["viewer"])


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global broadcaster

    await websocket.accept()

    try:
        join_payload = json.loads(await websocket.receive_text())
    except (json.JSONDecodeError, WebSocketDisconnect):
        await websocket.close(code=1003)
        return

    role = join_payload.get("role")
    if role not in {"broadcaster", "viewer"}:
        await websocket.send_text(json.dumps({"type": "error", "message": "Rol invalido"}))
        await websocket.close(code=1008)
        return

    client_roles[websocket] = role

    if role == "broadcaster":
        if broadcaster is not None:
            await websocket.send_text(
                json.dumps({"type": "error", "message": "Ya hay una camara conectada"})
            )
            await websocket.close(code=1008)
            return

        broadcaster = websocket
        await safe_send(websocket, {"type": "ready", "role": "broadcaster"})

        for viewer in list(viewers):
            await safe_send(viewer, {"type": "broadcaster-ready"})
            await safe_send(broadcaster, {"type": "viewer-ready", "viewer_id": str(id(viewer))})
    else:
        viewers.add(websocket)
        await safe_send(websocket, {"type": "ready", "role": "viewer"})

        if broadcaster is None:
            await safe_send(websocket, {"type": "waiting-broadcaster"})
        else:
            await safe_send(websocket, {"type": "broadcaster-ready"})
            await safe_send(broadcaster, {"type": "viewer-ready", "viewer_id": str(id(websocket))})

    try:
        while True:
            raw_message = await websocket.receive_text()
            data = json.loads(raw_message)
            message_type = data.get("type")

            if role == "broadcaster":
                if message_type in {"answer", "ice-candidate"}:
                    target_id = data.get("target")
                    for viewer in list(viewers):
                        if str(id(viewer)) == str(target_id):
                            payload = dict(data)
                            payload["from"] = str(id(websocket))
                            await safe_send(viewer, payload)
                            break
                elif message_type == "broadcast":
                    payload = dict(data)
                    payload["from"] = str(id(websocket))
                    for viewer in list(viewers):
                        await safe_send(viewer, payload)
            else:
                data["from"] = str(id(websocket))
                if broadcaster is not None:
                    await safe_send(broadcaster, data)
    except (WebSocketDisconnect, json.JSONDecodeError):
        pass
    finally:
        await unregister_client(websocket)


if __name__ == "__main__":
    local_ip = get_local_ip()
    print("Iniciando servidor de vista remota...")
    print(f"Camara:  http://localhost:{PORT}")
    print(f"Visor:   http://localhost:{PORT}/viewer")
    print(f"Red LAN: http://{local_ip}:{PORT}/viewer")
    uvicorn.run(app, host=HOST, port=PORT)
