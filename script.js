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

    elaborateSkillBtns.forEach(button => {
        button.addEventListener('click', async (event) => {
            const skillName = event.target.previousElementSibling.textContent;
            modalTitle.textContent = `Importancia de "${skillName}"`;
            modalContent.innerHTML = '<div class="loader"></div> Cargando...';
            skillModal.style.display = 'flex';

            try {
                const prompt = `Explica brevemente la importancia de la habilidad blanda '${skillName}' en un entorno profesional y cómo beneficia a un equipo o a la carrera de un individuo, en español. Sé conciso, no más de 100 palabras.`;
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = "AIzaSyAgHEis6KZTo4q0VFXZtCC_gjEu-JBKyNA";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    modalContent.textContent = text;
                } else {
                    modalContent.textContent = 'No se pudo generar la explicación. Inténtalo de nuevo.';
                }
            } catch (error) {
                modalContent.textContent = 'Error al conectar con la API de Gemini. Por favor, inténtalo más tarde.';
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

    let isActive = false;
    let isFirstTime = true;
    let handModel = null;
    let videoEl = null;
    let stream = null;
    let pinchLocked = false;

    const connections = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];

    async function loadModel() {
        gestureStatus.textContent = 'Cargando modelo...';
        
        try {
            const Hands = await import('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/+esm');
            const hs = Hands.default;
            
            handModel = new hs({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            });
            
            handModel.setOptions({
                maxNumHands: 1,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.5
            });
            
            handModel.onResults(onResults);
            gestureStatus.textContent = 'Listo';
        } catch (e) {
            gestureStatus.textContent = 'Error: ' + e.message;
            console.error(e);
        }
    }

    function onResults(results) {
        if (!isActive) return;
        
        const ctx = handCanvas.getContext('2d');
        ctx.save();
        
        ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
        
        if (videoEl && videoEl.readyState >= 2) {
            ctx.save();
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
        
        requestAnimationFrame(() => {
            if (isActive && videoEl) processFrame();
        });
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
        if (!isActive || !videoEl || !handModel) return;
        
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = 320;
        tmpCanvas.height = 240;
        const tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.drawImage(videoEl, 0, 0);
        
        handModel.send({ image: tmpCanvas });
    }

    async function startHandControl() {
        try {
            gestureStatus.textContent = 'Abriendo cámara...';
            
            stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 320, height: 240, facingMode: 'user' }
            });

            videoEl = document.createElement('video');
            videoEl.srcObject = stream;
            videoEl.setAttribute('playsinline', '');
            videoEl.muted = true;
            
            videoEl.onloadedmetadata = () => {
                videoEl.play().then(() => {
                    gestureStatus.textContent = '🎯 Listo!';
                    processFrame();
                }).catch(e => {
                    gestureStatus.textContent = 'Error: ' + e.message;
                });
            };
            
            videoEl.onerror = () => {
                gestureStatus.textContent = 'Error de video';
            };
        } catch (e) {
            console.error(e);
            gestureStatus.textContent = 'Error: ' + e.message;
            stopHandControlFunc();
        }
    }

    function stopHandControlFunc() {
        isActive = false;
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
            stream = null;
        }
        videoEl = null;
        cameraPreview.classList.add('hidden');
        handCursor.classList.add('hidden');
        handControlBtn.classList.remove('bg-red-600');
        handControlBtn.classList.add('bg-purple-600');
        gestureStatus.textContent = 'Detenido';
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
        
        await loadModel();
        isActive = true;
        await startHandControl();
    }

    stopHandControl.addEventListener('click', stopHandControlFunc);

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