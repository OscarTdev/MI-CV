# MI-CV

Interactive CV website for Oscar David Torres Baena.

## Tech Stack
- Static HTML with Tailwind CSS (CDN) and custom `styles.css`
- Vanilla JavaScript with Chart.js (CDN) for skills graph
- Data stored in `script.js`

## Hand Control (Computer Vision)
- Backend: `hand_control/server.py` - FastAPI + MediaPipe + WebSocket
- Run server: `python hand_control/server.py`
- Requires: camera permission

## Key Files
- `index.html` - Main structure and content
- `script.js` - Timeline data, skills chart config, hand control client
- `styles.css` - Custom styles
- `hand_control/` - Computer vision backend

## Gestures
- **Puntero** (índice + medio extendidos): Mover cursor
- **Clic** (pulgar + índice juntos): Clic
- **Scroll** (solo índice): Scroll hacia arriba
- **Scroll** (solo medio): Scroll hacia abajo
- **Cerrar puño**: Idle

## Workflow
```bash
git add .
git commit -m "Actualización"
git push
```

## Usage
1. Start server: `python hand_control/server.py`
2. Open CV in browser
3. Click hand button (purple) to connect
