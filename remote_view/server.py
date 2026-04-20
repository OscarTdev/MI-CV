from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import uvicorn
import asyncio

app = FastAPI()

clients = []

html_content = open("index.html", "r", encoding="utf-8").read()

@app.get("/")
async def get_page():
    return HTMLResponse(html_content)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for client in clients:
                if client != websocket:
                    await client.send_text(data)
    except:
        pass
    finally:
        if websocket in clients:
            clients.remove(websocket)

if __name__ == "__main__":
    print("Iniciando servidor...")
    print("Para acceso local: http://localhost:8000")
    print("Para acceso desde otro PC: http://TU_IP:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)