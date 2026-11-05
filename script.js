document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const skillModal = document.getElementById('skillModal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const elaborateSkillBtns = document.querySelectorAll('.elaborate-skill-btn');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Desarrollo Web', 'Bases de Datos', 'Análisis de Requisitos', 'Diseño UI/UX', 'Atención al Cliente', 'Soporte Técnico'],
            datasets: [{
                label: 'Nivel de Experiencia',
                data: [65, 50, 60, 55, 90, 75],
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                borderColor: 'rgba(0, 255, 255, 1)',
                pointBackgroundColor: 'rgba(0, 255, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 0, 255, 1)'
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 255, 255, 0.2)'
                    },
                    grid: {
                        color: 'rgba(0, 255, 255, 0.2)'
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#00FFFF'
                    },
                    ticks: {
                        backdropColor: 'rgba(10, 10, 10, 0.8)',
                        color: '#E0E0E0',
                        stepSize: 20
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw + '%';
                            return label;
                        }
                    }
                }
            }
        }
    });

    const timelineData = [
        {
            date: '2025 - Actualmente',
            title: 'Desarrollador de Software (Independiente)',
            icon: '💻',
            company: 'Freelance / Proyectos Personales',
            side: 'left',
            details: 'Aprendiendo los fundamentos del software para aplicar todas las etapas del ciclo de desarrollo: análisis de requisitos, diseño, desarrollo, pruebas, despliegue y mantenimiento. Enfoque como desarrollador independiente para crear soluciones completas.',
            images: [
                'https://placehold.co/400x250/a7f3d0/0d9488?text=Desarrollo+Software+1',
                'https://placehold.co/400x250/6ee7b7/0d9488?text=Desarrollo+Software+2',
                'https://placehold.co/400x250/2dd4bf/0d9488?text=Desarrollo+Software+3'
            ]
        },
        {
            date: '2024 - Actualmente',
            title: 'Técnico en Sistemas de Alarmas y CCTV',
            icon: '📹',
            company: 'Freelance (Independiente)',
            side: 'right',
            details: 'Instalación, configuración y mantenimiento de sistemas de alarmas y cámaras de videovigilancia CCTV. Diseño de soluciones de seguridad para hogares y pequeñas empresas, incluyendo configuración de DVR/NVR, monitoreo remoto y soporte técnico especializado.',
            images: [
                'https://placehold.co/400x250/60a5fa/2563eb?text=Sistemas+Alarmas+1',
                'https://placehold.co/400x250/93c5fd/2563eb?text=Sistemas+Alarmas+2',
                'https://placehold.co/400x250/60a5fa/2563eb?text=CCTV+1'
            ]
        },
        {
            date: '2021 - 2023',
            title: 'Técnico en Sistemas',
            icon: '🔧',
            company: 'Megacable',
            side: 'left',
            details: 'Atención al cliente, soporte técnico en conectividad e internet, instalación y configuración de módems y routers, diagnóstico y solución de fallas de red.',
            images: [
                'https://placehold.co/400x250/fca5a5/dc2626?text=Megacable+1',
                'https://placehold.co/400x250/fecaca/dc2626?text=Megacable+2',
                'https://placehold.co/400x250/f87171/dc2626?text=Megacable+3'
            ]
        },
        {
            date: '2018 - 2019',
            title: 'Técnico en Electricidad',
            icon: '⚡',
            company: 'Electricidad y Refrigeración Torres',
            side: 'left',
            details: 'Técnico en instalaciones eléctricas residenciales y comerciales, mantenimiento preventivo y correctivo, lectura de planos eléctricos.',
            images: [
                'https://placehold.co/400x250/fde047/ca8a04?text=Electricidad+1'
            ]
        },
        {
            date: '2019 - 2021',
            title: 'Técnico en Construcción',
            icon: '🏗️',
            company: 'ECTORRE',
            side: 'right',
            details: 'Trabajo en construcción, mantenimiento de instalaciones, acabados y reparaciones generales.',
            images: [
                'https://placehold.co/400x250/a3e635/65a30d?text=Construcción+1',
                'https://placehold.co/400x250/d9f99d/65a30d?text=Construcción+2'
            ]
        }
    ];

    const currentCarouselIndexes = {};

    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '';

    timelineData.forEach((item, index) => {
        const isLeft = item.side === 'left';
        const selfAlignClass = isLeft ? 'md:self-start' : 'md:self-end';
        const dotHorizontalPosition = isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2';

        const itemHTML = `
            <div class="relative timeline-item w-full md:w-1/2 px-4 py-2 ${selfAlignClass} z-10">
                <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 border-2 border-cyan-500 rounded-full timeline-dot z-20 ${dotHorizontalPosition}"></div>
                <div class="bg-gray-800 p-6 rounded-lg shadow-lg shadow-cyan-900/50 cursor-pointer border-l-4 border-cyan-600 relative z-10">
                    <p class="text-sm font-semibold text-purple-400">${item.date}</p>
                    <h4 class="text-lg font-bold text-cyan-400 mt-1">
                        <span class="text-xl mr-2">${item.icon}</span>${item.title}
                    </h4>
                    <p class="text-sm text-gray-300">${item.company}</p>
                    <div class="timeline-item-content mt-3 text-gray-200">
                        <p>${item.details}</p>
                    </div>
                </div>
            </div>
        `;
        timelineContainer.innerHTML += itemHTML;
        currentCarouselIndexes[index] = 0;
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            timelineItems.forEach(i => i.classList.remove('active'));
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
    }

    // Explicaciones estáticas de habilidades blandas (en español, sin API externa).
    const skillExplanations = {
        'Resolución de Problemas': 'Capacidad para analizar una situación, identificar la causa raíz de un problema y proponer soluciones efectivas. Beneficia al equipo al reducir tiempos de bloqueo y mejorar la calidad de las entregas.',
        'Habilidad para aprender rápidamente y adaptarme': 'Facilidad para adoptar nuevas tecnologías, herramientas y metodologías en poco tiempo. Permite al equipo mantenerse actualizado y enfrentar cambios de requerimientos sin fricción.',
        'Trabajo en Equipo y Comunicación': 'Habilidad para colaborar con otros miembros del equipo, escuchar activamente y comunicar ideas de forma clara. Mejora el ambiente de trabajo y la alineación hacia objetivos comunes.',
        'Proactividad e Iniciativa': 'Tendencia a anticipar necesidades, proponer mejoras y actuar sin esperar instrucciones directas. Aporta valor al equipo al identificar oportunidades antes de que se conviertan en problemas.',
        'Orientación a Resultados y Compromiso': 'Enfoque en cumplir metas y entregar valor dentro de los plazos acordados. Genera confianza en el equipo y en los stakeholders al entregar lo prometido.',
        'Atención al Detalle': 'Capacidad de revisar y corregir pequeños aspectos que pueden pasar desapercibidos. Reduce errores, mejora la calidad del producto final y evita retrabajo.'
    };

    // Intenta explicar con NVIDIA (modelo ligero) si el usuario configura el endpoint y key.
    // Fallback a texto estático si no hay configuración o la llamada falla.
    async function explainSkill(skillName) {
        const nvidiaEndpoint = window.NVIDIA_ENDPOINT || '';
        const nvidiaApiKey = window.NVIDIA_API_KEY || '';
        const staticText = skillExplanations[skillName] || 'Explicación no disponible para esta habilidad.';

        if (!nvidiaEndpoint || !nvidiaApiKey) {
            return staticText;
        }

        try {
            const prompt = `Explica brevemente la importancia de la habilidad blanda '${skillName}' en un entorno profesional y cómo beneficia a un equipo o a la carrera de un individuo, en español. Sé conciso, no más de 100 palabras.`;
            const response = await fetch(nvidiaEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${nvidiaApiKey}`
                },
                body: JSON.stringify({
                    model: 'nvidia/llama-3.1-nemotron-nano-8b-v1',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 200
                })
            });

            if (!response.ok) {
                throw new Error(`NVIDIA responded ${response.status}`);
            }

            const result = await response.json();
            if (result.choices && result.choices.length > 0 && result.choices[0].message) {
                return result.choices[0].message.content;
            }
            return staticText;
        } catch (error) {
            console.error('NVIDIA error:', error);
            return staticText;
        }
    }

    elaborateSkillBtns.forEach(button => {
        button.addEventListener('click', async (event) => {
            const skillName = event.target.previousElementSibling.textContent;
            modalTitle.textContent = `Importancia de "${skillName}"`;
            modalContent.innerHTML = '<div class="loader"></div> Cargando...';
            skillModal.style.display = 'flex';

            try {
                const text = await explainSkill(skillName);
                modalContent.textContent = text;
            } catch (error) {
                modalContent.textContent = 'No se pudo cargar la explicación. Inténtalo de nuevo.';
            }
        });
    });

    closeButton.addEventListener('click', () => {
        skillModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == skillModal) {
            skillModal.style.display = 'none';
        }
    });

    const handControlBtn = document.getElementById('handControlBtn');
    const cameraPreview = document.getElementById('cameraPreview');
    const handCanvas = document.getElementById('handCanvas');
    const gestureStatus = document.getElementById('gestureStatus');
    const stopHandControl = document.getElementById('stopHandControl');
    const handCursor = document.getElementById('handCursor');
    const handTutorial = document.getElementById('handTutorial');
    const startHandControlBtn = document.getElementById('startHandControl');
    const videoEl = document.getElementById('handVideoEl');

    let isActive = false;
    let isFirstTime = true;
    let handModel = null;
    let stream = null;
    let pinchLocked = false;
    let handSocket = null;
    let lastScrollAt = 0;
    const handCanvasCtx = handCanvas.getContext('2d');
    const frameImage = new Image();
    const HAND_CONTROL_HOST = window.HAND_CONTROL_HOST || 'mi-cv-0flu.onrender.com';
    const HAND_CONTROL_PORT = window.HAND_CONTROL_PORT || '443';
    const frameCanvas = document.createElement('canvas');
    const frameCtx = frameCanvas.getContext('2d');
    let frameLoopId = null;

    frameCanvas.width = 320;
    frameCanvas.height = 240;

    const connections = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];

    frameImage.addEventListener('load', () => {
        handCanvasCtx.clearRect(0, 0, handCanvas.width, handCanvas.height);
        handCanvasCtx.drawImage(frameImage, 0, 0, handCanvas.width, handCanvas.height);
    });

    function updateCursorPosition(cursorX, cursorY) {
        const x = (cursorX / 100) * window.innerWidth;
        const y = (cursorY / 100) * window.innerHeight;
        handCursor.style.left = (x - 16) + 'px';
        handCursor.style.top = (y - 16) + 'px';
        return { x, y };
    }

    function updateGestureLabel(gesture) {
        const labels = {
            connected: 'Servidor conectado',
            pointer: 'Mover cursor',
            click: 'Clic',
            scroll_up: 'Scroll arriba',
            scroll_down: 'Scroll abajo',
            fist: 'Idle',
            waiting: 'Sin mano',
            stopped: 'Detenido'
        };

        gestureStatus.textContent = labels[gesture] || gesture || 'Esperando...';
    }

    function applyGestureState(state) {
        if (!state) return;

        const { x, y } = updateCursorPosition(state.cursor_x ?? 50, state.cursor_y ?? 50);
        updateGestureLabel(state.gesture);

        if (state.click) {
            if (!pinchLocked) {
                document.elementFromPoint(x, y)?.click();
                pinchLocked = true;
            }
        } else {
            pinchLocked = false;
        }

        if (state.scroll) {
            const now = Date.now();
            if (now - lastScrollAt > 60) {
                window.scrollBy(0, state.scroll * 12);
                lastScrollAt = now;
            }
        }
    }

    async function loadModel() {
        gestureStatus.textContent = 'Conectando al servidor...';

        // Candidatos: host/puerto configurados, con y sin puerto explicito.
        // Render sirve WebSockets en el mismo host via wss:// en el puerto 443.
        const isSecure = window.location.protocol === 'https:' || window.location.hostname.includes('onrender.com');
        const candidates = [
            { protocol: isSecure ? 'wss' : 'ws', host: HAND_CONTROL_HOST, port: HAND_CONTROL_PORT },
            { protocol: isSecure ? 'wss' : 'ws', host: HAND_CONTROL_HOST, port: '' },
        ];

        let lastError = null;

        for (const candidate of candidates) {
            const portPart = candidate.port ? `:${candidate.port}` : '';
            const url = `${candidate.protocol}://${candidate.host}${portPart}/connect`;

            try {
                await connectSocket(url);
                return;
            } catch (error) {
                lastError = error;
                console.warn(`Hand control: fallo al conectar con ${url}`, error);
            }
        }

        throw lastError || new Error('No se pudo conectar con el servidor de mano');
    }

    function connectSocket(url) {
        return new Promise((resolve, reject) => {
            let socket;
            try {
                socket = new WebSocket(url);
            } catch (error) {
                reject(error);
                return;
            }

            const timeout = setTimeout(() => {
                socket.close();
                reject(new Error(`Tiempo de espera agotado conectando a ${url}`));
            }, 20000);

            socket.addEventListener('open', () => {
                clearTimeout(timeout);
                handSocket = socket;
                handModel = { connected: true };
                socket.send(JSON.stringify({ role: 'controller' }));
                updateGestureLabel('connected');
                resolve();
            });

            socket.addEventListener('message', (event) => {
                try {
                    const payload = JSON.parse(event.data);

                    if (payload.frame) {
                        frameImage.src = `data:image/jpeg;base64,${payload.frame}`;
                    }

                    if (payload.status === 'error') {
                        const errorMessage = payload.message || 'Error en el servidor';
                        stopHandControlFunc(false);
                        gestureStatus.textContent = errorMessage;
                        return;
                    }

                    applyGestureState(payload.gesture_state);
                } catch (error) {
                    console.error('Error procesando hand control:', error);
                }
            });

            socket.addEventListener('close', () => {
                clearTimeout(timeout);
                if (isActive) {
                    gestureStatus.textContent = 'Conexion cerrada';
                    stopHandControlFunc(false);
                }
            });

            socket.addEventListener('error', () => {
                clearTimeout(timeout);
                reject(new Error(`No se pudo conectar con el servidor de mano en ${url}`));
            });
        });
    }

    function onResults(results) {
        if (!isActive) return;
        
        const ctx = handCanvas.getContext('2d');
        ctx.save();
        
        ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
        
        if (videoEl && videoEl.readyState >= 2) {
            ctx.save();
            ctx.translate(handCanvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(videoEl, 0, 0, handCanvas.width, handCanvas.height);
            ctx.restore();
        }

        let handDetected = false;
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            handDetected = true;
            const lm = results.multiHandLandmarks[0];
            drawHand(ctx, lm);

            const idxTip = lm[8], idxPip = lm[6];
            const midTip = lm[12], midPip = lm[10];
            const thTip = lm[4];

            const idxExt = idxTip.y < idxPip.y;
            const midExt = midTip.y < midPip.y;
            const dist = Math.hypot(idxTip.x - thTip.x, idxTip.y - thTip.y);

            const x = idxTip.x * window.innerWidth;
            const y = idxTip.y * window.innerHeight;
            handCursor.style.left = (x - 16) + 'px';
            handCursor.style.top = (y - 16) + 'px';

            if (idxExt && midExt) {
                gestureStatus.textContent = '☝️+🖖 Mover cursor';
            } else if (dist < 0.05) {
                if (!pinchLocked) {
                    document.elementFromPoint(x, y)?.click();
                    pinchLocked = true;
                }
                gestureStatus.textContent = '🤏 Clic!';
            } else {
                if (dist > 0.08) pinchLocked = false;
                if (idxExt && !midExt) {
                    window.scrollBy(0, -15);
                    gestureStatus.textContent = '☝️ Scroll ↑';
                } else if (!idxExt && midExt) {
                    window.scrollBy(0, 15);
                    gestureStatus.textContent = '🖖 Scroll ↓';
                } else {
                    gestureStatus.textContent = '✊ Idle';
                }
            }
        }
        
        if (!handDetected) {
            gestureStatus.textContent = '👀 Sin mano';
        }
        
        ctx.restore();
        
        setTimeout(() => {
            if (isActive && handModel) processFrame();
        }, 30);
    }

    function drawHand(ctx, lm) {
        ctx.strokeStyle = '#00FFFF';
        ctx.fillStyle = '#00FFFF';
        ctx.lineWidth = 2;

        connections.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(lm[i].x * handCanvas.width, lm[i].y * handCanvas.height);
            ctx.lineTo(lm[j].x * handCanvas.width, lm[j].y * handCanvas.height);
            ctx.stroke();
        });

        lm.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x * handCanvas.width, p.y * handCanvas.height, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    function processFrame() {
        if (!isActive || !videoEl || !handModel || !handSocket || handSocket.readyState !== WebSocket.OPEN) {
            frameLoopId = null;
            return;
        }
        
        if (videoEl.readyState < 2) {
            frameLoopId = window.setTimeout(processFrame, 120);
            return;
        }
        
        try {
            frameCtx.drawImage(videoEl, 0, 0, frameCanvas.width, frameCanvas.height);
            handSocket.send(JSON.stringify({
                action: 'frame',
                frame: frameCanvas.toDataURL('image/jpeg', 0.7)
            }));
        } catch(e) {
            console.error(e);
        }

        frameLoopId = window.setTimeout(processFrame, 90);
    }

    async function startHandControl() {
        try {
            gestureStatus.textContent = 'Pidiendo camara...';
            
            stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 320, height: 240, facingMode: 'user' }
            });

            videoEl.srcObject = stream;
            videoEl.setAttribute('playsinline', '');
            videoEl.muted = true;
            videoEl.autoplay = true;
            
            await videoEl.play();
            
            gestureStatus.textContent = 'Procesando...';
            
            if (frameLoopId) {
                clearTimeout(frameLoopId);
            }
            frameLoopId = window.setTimeout(processFrame, 250);
        } catch (e) {
            console.error(e);
            gestureStatus.textContent = 'Error: ' + e.message;
            stopHandControlFunc();
        }
    }

    function stopHandControlFunc(notifyServer = true) {
        isActive = false;
        handModel = null;
        lastScrollAt = 0;
        pinchLocked = false;
        if (frameLoopId) {
            clearTimeout(frameLoopId);
            frameLoopId = null;
        }
        if (notifyServer && handSocket && handSocket.readyState === WebSocket.OPEN) {
            handSocket.send(JSON.stringify({ action: 'stop' }));
        }
        if (handSocket) {
            handSocket.close();
            handSocket = null;
        }
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
            stream = null;
        }
        if (videoEl) {
            videoEl.srcObject = null;
        }
        cameraPreview.classList.add('hidden');
        handCursor.classList.add('hidden');
        handControlBtn.classList.remove('bg-red-600');
        handControlBtn.classList.add('bg-purple-600');
        gestureStatus.textContent = 'Detenido';
        handCanvasCtx.clearRect(0, 0, handCanvas.width, handCanvas.height);
    }

    handControlBtn.addEventListener('click', () => {
        if (isActive) {
            stopHandControlFunc();
        } else if (isFirstTime) {
            handTutorial.classList.remove('hidden');
        } else {
            activateHandControl();
        }
    });

    startHandControlBtn?.addEventListener('click', () => {
        handTutorial.classList.add('hidden');
        isFirstTime = false;
        activateHandControl();
    });

    async function activateHandControl() {
        cameraPreview.classList.remove('hidden');
        handCursor.classList.remove('hidden');
        handControlBtn.classList.remove('bg-purple-600');
        handControlBtn.classList.add('bg-red-600');
        isActive = true;

        try {
            await loadModel();
            await startHandControl();
        } catch (error) {
            console.error(error);
            stopHandControlFunc(false);
            gestureStatus.textContent = error.message;
        }
    }

    stopHandControl.addEventListener('click', stopHandControlFunc);

    const handControlBtnSection = document.getElementById('handControlBtnSection');
    if (handControlBtnSection) {
        handControlBtnSection.addEventListener('click', () => {
            if (isActive) {
                stopHandControlFunc();
            } else if (isFirstTime) {
                document.getElementById('handTutorial').classList.remove('hidden');
            } else {
                activateHandControl();
            }
        });
    }

    const cameraHeader = document.getElementById('cameraHeader');
    let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;

    cameraHeader?.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragOffsetX = e.clientX - cameraPreview.offsetLeft;
        dragOffsetY = e.clientY - cameraPreview.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            cameraPreview.style.left = (e.clientX - dragOffsetX) + 'px';
            cameraPreview.style.top = (e.clientY - dragOffsetY) + 'px';
            cameraPreview.style.right = 'auto';
        }
    });

    document.addEventListener('mouseup', () => isDragging = false);

    let touchStartX, touchStartY, touchStartLeft, touchStartTop;
    cameraHeader?.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartLeft = cameraPreview.offsetLeft;
        touchStartTop = cameraPreview.offsetTop;
    });

    document.addEventListener('touchmove', (e) => {
        if (touchStartX !== undefined) {
            const t = e.touches[0];
            cameraPreview.style.left = (touchStartLeft + t.clientX - touchStartX) + 'px';
            cameraPreview.style.top = (touchStartTop + t.clientY - touchStartY) + 'px';
            cameraPreview.style.right = 'auto';
        }
    });

    document.addEventListener('touchend', () => {
        touchStartX = undefined;
    });
});
