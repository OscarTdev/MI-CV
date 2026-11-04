# Modo Local — CV de Oscar David Torres Baena

Arranca el frontend + el servidor de control por mano (hand control) en tu misma máquina.

## Estructura

```
MI-CV/
├── index.html           # Frontend (abre este archivo en el navegador)
├── script.js            # Cliente hand control + lógica
├── styles.css           # Estilos custom
├── hand_control/
│   ├── server.py        # Servidor FastAPI + MediaPipe (WebSocket)
│   ├── client.js        # (no usado directamente por el frontend)
│   └── requirements.txt # Dependencias Python
├── LOCAL.md             # este archivo
└── PROGRESS.md          # progreso del design loop
```

## 1. Instalar dependencias Python

```bash
cd hand_control
pip install -r requirements.txt
```

## 2. Iniciar el servidor hand control

Desde la carpeta `hand_control/`:

```bash
python server.py
```

El servidor quedará escuchando en `http://127.0.0.1:8000` y el WebSocket en `ws://127.0.0.1:8000/connect`.

> El `script.js` ya tiene configurado por defecto `HAND_CONTROL_HOST = '127.0.0.1'` y `HAND_CONTROL_PORT = '8000'`, así que no necesitas editar nada para modo local.

## 3. Abrir el CV

Opción A (recomendada para probar hand control): abre el archivo directamente desde tu carpeta:

```
file:///C:/Users/juand/OneDrive/Desktop/MI-CV/index.html
```

Opción B: sirve el frontend con un servidor HTTP local (evita problemas de CORS con algunos navegadores):

```bash
# Desde la raíz de MI-CV:
python -m http.server 8765
```
Luego abre `http://localhost:8765`.

## 4. Activar hand control

1. Haz clic en el botón morado "Control por mano" (esquina inferior derecha) o en el botón de la sección "Demostración Interactiva".
2. Concede permiso de cámara cuando el navegador lo pida.
3. Aparecerá el tutorial. Haz clic en "¡Entendido, comenzar!".
4. Gestos disponibles:
   - Índice + medio → mover cursor
   - Pulgar + índice → clic
   - Solo índice → scroll arriba
   - Solo medio → scroll abajo
   - Puño cerrado → idle

## 5. Notas importantes

- **GitHub Pages no ejecuta Python.** Si subes el CV a GitHub Pages, el hand control solo funcionará si tú tienes el servidor `server.py` corriendo en tu máquina y el cliente apunta a tu IP local (o la expones con ngrok).
- **Cámara:** el hand control requiere acceso a la webcam. Si no concedes el permiso, el botón mostrará "Error: ...".
- **Cambiar IP/puerto:** si necesitas otro host o puerto, edita `window.HAND_CONTROL_HOST` y `window.HAND_CONTROL_PORT` antes de cargar `script.js`, o pásalos como variables globales en el HTML.

## 6. Script de arranque rápido (Windows)

Guarda esto como `start-local.bat` en la raíz de `MI-CV/` y haz doble clic:

```batch
@echo off
cd /d "%~dp0\hand_control"
start "" cmd /k "python server.py"
timeout /t 3 >nul
start "" "index.html"
```

## Solución de problemas

| Problema | Solución |
|----------|----------|
| "No se pudo conectar con el servidor de mano" | Verifica que `python server.py` esté corriendo en otra terminal |
| Cámara no se activa | Concede permiso de cámara en el navegador; cierra otras apps que usen la webcam |
| El botón no hace nada | Abre la consola del navegador (F12) y revisa errores de WebSocket |
