const handControl = {
    model: null,
    video: null,
    canvas: null,
    ctx: null,
    isActive: false,
    lastClick: false,
    pinchLocked: false,

    async init() {
        await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core')
        await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter')
        await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl')
        await import('https://cdn.jsdelivr.net/npm/@mediapipe/hands');

        this.model = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
        this.model.setOptions({ maxNumHands: 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.5 });
        this.model.onResults((results) => this.onResults(results));

        this.video = document.createElement('video');
        this.video.autoplay = true;
        this.video.playsInline = true;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 320;
        this.canvas.height = 240;
        this.ctx = this.canvas.getContext('2d');
    },

    async start(videoElement, statusElement, cursorElement) {
        if (this.isActive) return;

        this.videoElement = videoElement;
        this.statusElement = statusElement;
        this.cursorElement = cursorElement;

        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
        this.video.srcObject = stream;
        await new Promise(resolve => this.video.onloadedmetadata = resolve);
        this.video.play();

        this.isActive = true;
        this.capture();
    },

    async capture() {
        if (!this.isActive) return;

        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        await this.model.send({ image: this.canvas });
        requestAnimationFrame(() => this.capture());
    },

    onResults(results) {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];

            const indexTip = landmarks[8];
            const indexPip = landmarks[6];
            const middleTip = landmarks[12];
            const middlePip = landmarks[10];
            const thumbTip = landmarks[4];

            const indexExtended = indexTip.y < indexPip.y;
            const middleExtended = middleTip.y < middlePip.y;

            const distThumbIndex = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);

            const x = indexTip.x * window.innerWidth;
            const y = indexTip.y * window.innerHeight;
            this.cursorElement.style.left = (x - 16) + 'px';
            this.cursorElement.style.top = (y - 16) + 'px';

            if (indexExtended && middleExtended) {
                this.statusElement.textContent = 'pointer';
            } else if (distThumbIndex < 0.05) {
                if (!this.pinchLocked) {
                    this.clickAt(x, y);
                    this.pinchLocked = true;
                }
                this.statusElement.textContent = 'click';
            } else {
                if (distThumbIndex > 0.08) this.pinchLocked = false;
                if (indexExtended && !middleExtended) {
                    window.scrollBy(0, -10);
                    this.statusElement.textContent = 'scroll_up';
                } else if (!indexExtended && middleExtended) {
                    window.scrollBy(0, 10);
                    this.statusElement.textContent = 'scroll_down';
                } else {
                    this.statusElement.textContent = 'fist';
                }
            }
        } else {
            this.statusElement.textContent = 'Sin mano';
        }
    },

    clickAt(x, y) {
        const element = document.elementFromPoint(x, y);
        element?.click();
    },

    stop() {
        this.isActive = false;
        if (this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(t => t.stop());
        }
    }
};

window.handControl = handControl;