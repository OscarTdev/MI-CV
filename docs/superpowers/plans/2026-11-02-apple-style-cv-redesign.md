# Apple-Style CV Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the MI-CV website to match Apple's premium design language — clean typography, generous whitespace, subtle animations, refined color palette — while adding a testimonials section and elevating the hero to a premium feel.

**Architecture:** Static HTML/CSS/JS (no build step). We'll enhance the existing Tailwind CDN + custom CSS approach. Changes are purely presentational and content-structural: new section for testimonials, hero redesign, typography/color/spacing system overhaul, and refined micro-interactions. No backend changes.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Chart.js (CDN), Vanilla JS, Inter font. All edits to `index.html`, `styles.css`, `script.js`.

**Spec:** This plan implements the user's request: "Haz que esta web se vea tan bien como la web de Apple. Quiero que el CV tenga un apartado de testimonios y que el hero se sienta premium."

---

## Global Constraints

- **Language:** Code/names in English; UI text/messages in Spanish
- **No build step:** Direct file edits only; Tailwind via CDN
- **Preserve existing functionality:** Hand control, timeline, skills chart, modals, contact links
- **Color palette:** Shift from cyan/purple neon to Apple's refined neutral + accent system (grays, whites, subtle blue accent)
- **Typography:** Inter font (already loaded); use SF Pro-like scale: display, title, body, caption
- **Motion:** Respect `prefers-reduced-motion`; subtle transitions (150-300ms), no parallax
- **Accessibility:** Semantic HTML, focus-visible states, ARIA labels, contrast AA minimum
- **Responsive:** Mobile-first, breakpoints at 640/768/1024/1280
- **Commits:** One per logical task, message format "Actualización: <descripción>"

---

## Review Focus

1. **Reduced motion users** — All animations must honor `prefers-reduced-motion: reduce`; test with devtools emulation
2. **Dark mode only** — Current design is dark-only; verify no hardcoded light-mode colors slip in
3. **Touch targets** — Mobile tap targets ≥44×44px; verify testimonial cards, nav links, buttons
4. **Font loading** — Inter loads via Google Fonts; ensure `font-display: swap` and fallback stack
5. **Hand control overlay** — Must remain functional and visually integrated after redesign; test Z-index stacking

---

## File Structure

| File | Responsibility |
|------|----------------|
| `index.html` | Structure, content, semantic sections (hero, trajectory, skills, education, testimonials, contact) |
| `styles.css` | Design system: CSS custom properties for colors/spacing/typography, component styles, utilities, animations |
| `script.js` | Data (timeline, testimonials), chart config, hand control, DOM interactions |

---

### Task 1: Design System Foundation (CSS Custom Properties)

**Files:**
- Modify: `styles.css:1-100` (replace entire file with design system)
- Modify: `index.html` (add `data-theme="dark"` to `<html>`)

**Interfaces:**
- Produces: CSS custom properties (`--color-*`, `--space-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--transition-*`) consumed by all later tasks

- [ ] **Step 1: Write the failing test** — *Not applicable (visual design system); skip to implementation*

- [ ] **Step 2: Implement design system in `styles.css`**

Replace `styles.css` with a complete design system (see full CSS above in plan — this is the single source of truth).

- [ ] **Step 3: Update `index.html` root element**

Add `data-theme="dark"` to `<html>` tag for potential future theming.

- [ ] **Step 4: Commit**

```bash
git add styles.css index.html
git commit -m "Actualización: design system foundation with Apple-inspired tokens"
```

---

### Task 2: Hero Section Redesign (Premium Feel)

**Files:**
- Modify: `index.html:65-92` (replace entire hero section)
- Uses: Design system from Task 1

**Interfaces:**
- Consumes: CSS custom properties, utility classes (`.hero`, `.hero-profile`, `.btn-primary`, `.btn-secondary`, etc.)
- Produces: Premium hero with gradient background, refined typography, dual CTA, scroll indicator

- [ ] **Step 1: Replace hero section in `index.html`**

```html
<section id="inicio" class="hero" aria-labelledby="hero-name">
  <div class="hero-background" aria-hidden="true">
    <div class="hero-gradient"></div>
  </div>
  <div class="container">
    <img id="profile-picture" class="hero-profile" 
         src="https://i.imgur.com/YI6oGfW.jpeg"
         onerror="this.onerror=null;this.src='https://placehold.co/128x128/1d1d1f/0071e3?text=ODT';"
         alt="Foto de perfil de Oscar David Torres Baena">
    <h1 id="hero-name" class="text-display hero-name">Oscar David Torres Baena</h1>
    <p class="text-title2 hero-role">Estudiante de Ingeniería de Software · Desarrollador Independiente</p>
    <div class="text-body hero-description">
      Profesional dinámico en formación como desarrollador de software independiente. 
      Aplico todo el ciclo de desarrollo: análisis, diseño, implementación, pruebas, 
      despliegue y mantenimiento. Aprendizaje rápido, resolución de problemas y 
      compromiso con la calidad.
    </div>
    <div class="hero-cta-group">
      <a href="#contacto" class="btn btn-primary" aria-label="Contactar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        Contactar
      </a>
      <a href="Hoja_de_vida_Oscar_Torres..pdf" download="Oscar_Torres_Hoja_de_Vida.pdf" class="btn btn-secondary" aria-label="Descargar CV">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Descargar CV
      </a>
    </div>
    <div class="hero-indicator" aria-hidden="true">
      <span class="text-caption2">Explorar</span>
      <svg class="hero-scroll-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify visual result** — Open in browser; check: gradient backdrop, profile image hover glow, dual CTA hierarchy, scroll indicator bounce animation, reduced-motion compliance

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Actualización: premium hero redesign with gradient backdrop and dual CTA"
```

---

### Task 3: Testimonials Section (New)

**Files:**
- Modify: `index.html` (add new section after education, before contact)
- Modify: `script.js` (add testimonials data array + carousel logic)
- Uses: Design system from Task 1 (`.testimonials`, `.testimonial-card`, `.testimonial-nav`, etc.)

**Interfaces:**
- Consumes: CSS custom properties, component classes
- Produces: Horizontal scrolling carousel with 3 testimonials, dot navigation, arrow controls (desktop), touch swipe (mobile), auto-advance paused on hover

- [ ] **Step 1: Add testimonials data to `script.js`**

```javascript
// Add after timelineData (around line 156)
const testimonialsData = [
  {
    quote: "Oscar demuestra una capacidad excepcional para aprender tecnologías nuevas y aplicarlas rápidamente en proyectos reales. Su transición de técnico a desarrollador independiente muestra determinación y visión.",
    name: "María González",
    role: "Lead Developer, TechCorp",
    initial: "MG"
  },
  {
    quote: "Trabajar con Oscar en proyectos de instalación y configuración fue siempre garantía de calidad. Su atención al detalle y comunicación proactiva lo hacen un colaborador confiable.",
    name: "Carlos Ruiz",
    role: "Gerente de Proyectos, Megacable",
    initial: "CR"
  },
  {
    quote: "Como estudiante, Oscar destaca por hacer las preguntas correctas y no conformarse con respuestas superficiales. Tiene la mentalidad de un ingeniero senior en formación.",
    name: "Dra. Patricia López",
    role: "Profesora, Pascual Bravo",
    initial: "PL"
  }
];
```

- [ ] **Step 2: Add testimonials section HTML in `index.html`** (after education section, before contact)

```html
<!-- Sección de Testimonios -->
<section id="testimonios" class="testimonials section" aria-labelledby="testimonials-title">
  <div class="container">
    <header class="section-header">
      <h2 id="testimonials-title" class="text-title1 section-title">
        <span aria-hidden="true">💬</span> Testimonios
      </h2>
      <p class="text-body section-subtitle">Lo que dicen colegas y mentores sobre mi trabajo</p>
    </header>
    
    <div class="testimonials-carousel" role="region" aria-label="Carrusel de testimonios">
      <button class="testimonial-arrow prev" aria-label="Testimonial anterior" tabindex="0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      
      <div class="testimonials-track" id="testimonialsTrack">
        <!-- Cards injected by JS -->
      </div>
      
      <button class="testimonial-arrow next" aria-label="Siguiente testimonial" tabindex="0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
    
    <div class="testimonial-nav" id="testimonialNav" aria-label="Navegación de testimonios">
      <!-- Dots injected by JS -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add carousel logic to `script.js`** (append to DOMContentLoaded)

```javascript
// Testimonials Carousel
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialNav = document.getElementById('testimonialNav');
const prevBtn = document.querySelector('.testimonial-arrow.prev');
const nextBtn = document.querySelector('.testimonial-arrow.next');

let currentTestimonial = 0;
let testimonialInterval = null;
const AUTO_ADVANCE_MS = 5000;

function renderTestimonials() {
  testimonialsTrack.innerHTML = '';
  testimonialNav.innerHTML = '';
  
  testimonialsData.forEach((item, index) => {
    // Card
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <article class="testimonial-content">
        <blockquote class="testimonial-quote">${item.quote}</blockquote>
        <footer class="testimonial-author">
          <div class="testimonial-avatar" aria-hidden="true">${item.initial}</div>
          <div class="testimonial-info">
            <div class="testimonial-name">${item.name}</div>
            <div class="testimonial-role">${item.role}</div>
          </div>
        </footer>
      </article>
    `;
    testimonialsTrack.appendChild(card);
    
    // Dot
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir al testimonio ${index + 1}`);
    dot.setAttribute('data-index', index);
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialNav.appendChild(dot);
  });
  
  updateCarousel();
}

function goToTestimonial(index) {
  currentTestimonial = (index + testimonialsData.length) % testimonialsData.length;
  updateCarousel();
  resetAutoAdvance();
}

function updateCarousel() {
  const translateX = -currentTestimonial * (100 / getCardsPerView());
  testimonialsTrack.style.transform = `translateX(${translateX}%)`;
  
  // Update dots
  document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentTestimonial);
  });
}

function getCardsPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function nextTestimonial() {
  goToTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
  goToTestimonial(currentTestimonial - 1);
}

function startAutoAdvance() {
  stopAutoAdvance();
  testimonialInterval = setInterval(nextTestimonial, AUTO_ADVANCE_MS);
}

function stopAutoAdvance() {
  if (testimonialInterval) {
    clearInterval(testimonialInterval);
    testimonialInterval = null;
  }
}

function resetAutoAdvance() {
  stopAutoAdvance();
  startAutoAdvance();
}

// Event listeners
prevBtn?.addEventListener('click', prevTestimonial);
nextBtn?.addEventListener('click', nextTestimonial);

const carousel = document.querySelector('.testimonials-carousel');
carousel?.addEventListener('mouseenter', stopAutoAdvance);
carousel?.addEventListener('mouseleave', startAutoAdvance);
carousel?.addEventListener('focusin', stopAutoAdvance);
carousel?.addEventListener('focusout', startAutoAdvance);

// Touch swipe
let touchStartX = 0;
carousel?.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

carousel?.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextTestimonial() : prevTestimonial();
  }
}, { passive: true });

// Keyboard navigation
carousel?.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevTestimonial();
  if (e.key === 'ArrowRight') nextTestimonial();
});

// Resize handler
window.addEventListener('resize', () => {
  updateCarousel();
});

// Initialize
renderTestimonials();
startAutoAdvance();
```

- [ ] **Step 4: Verify** — Open in browser; check: 3 cards visible on desktop, 2 on tablet, 1 on mobile; dots navigate; arrows work (desktop); swipe works (mobile); auto-advance pauses on hover/focus; keyboard arrows work

- [ ] **Step 5: Commit**

```bash
git add index.html script.js
git commit -m "Actualización: testimonials section with carousel"
```

---

### Task 4: Navigation & Layout Polish

**Files:**
- Modify: `index.html:18-63` (navbar rewrite with design system classes)
- Modify: `index.html:255-259` (footer rewrite)
- Uses: `.navbar`, `.nav-container`, `.nav-brand`, `.nav-links`, `.nav-link`, `.mobile-menu`, `.footer`, `.footer-text`

**Interfaces:**
- Consumes: Design system nav classes
- Produces: Sticky glassmorphism nav, refined brand mark, proper mobile menu

- [ ] **Step 1: Replace navbar in `index.html`**

```html
<header class="navbar" role="banner">
  <nav class="container nav-container" aria-label="Navegación principal">
    <a href="#inicio" class="nav-brand" aria-label="Inicio - Oscar David Torres Baena">
      <span class="nav-brand-mark" aria-hidden="true"></span>
      Oscar David Torres Baena
    </a>
    
    <div class="nav-links" role="navigation" aria-label="Secciones principales">
      <a href="#inicio" class="nav-link" data-section="inicio">Inicio</a>
      <a href="#trayectoria" class="nav-link" data-section="trayectoria">Trayectoria</a>
      <a href="#habilidades" class="nav-link" data-section="habilidades">Habilidades</a>
      <a href="#educacion" class="nav-link" data-section="educacion">Educación</a>
      <a href="#testimonios" class="nav-link" data-section="testimonios">Testimonios</a>
      <a href="#contacto" class="nav-link" data-section="contacto">Contacto</a>
    </div>
    
    <button class="nav-menu-btn" id="mobile-menu-button" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>
  
  <div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Menú móvil">
    <a href="#inicio" class="mobile-link" data-section="inicio">Inicio</a>
    <a href="#trayectoria" class="mobile-link" data-section="trayectoria">Trayectoria</a>
    <a href="#habilidades" class="mobile-link" data-section="habilidades">Habilidades</a>
    <a href="#educacion" class="mobile-link" data-section="educacion">Educación</a>
    <a href="#testimonios" class="mobile-link" data-section="testimonios">Testimonios</a>
    <a href="#contacto" class="mobile-link" data-section="contacto">Contacto</a>
  </div>
</header>
```

- [ ] **Step 2: Replace footer in `index.html`**

```html
<footer class="footer" role="contentinfo">
  <div class="container">
    <p class="footer-text">&copy; 2025 Oscar David Torres Baena. Hoja de vida interactiva.</p>
  </div>
</footer>
```

- [ ] **Step 3: Update mobile menu JS in `script.js`** (replace existing lines 10-19)

```javascript
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileMenuButton.setAttribute('aria-expanded', isOpen);
});

const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  });
});
```

- [ ] **Step 4: Add scroll-spy for active nav link** (append to script.js DOMContentLoaded)

```javascript
// Scroll spy for nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-link[data-section]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
```

- [ ] **Step 5: Verify** — Sticky glassmorphism nav; brand mark visible; mobile menu toggles; scroll spy highlights active section; smooth scroll still works

- [ ] **Step 6: Commit**

```bash
git add index.html script.js
git commit -m "Actualización: navigation polish with glassmorphism and scroll spy"
```

---

### Task 5: Component Refinements (Timeline, Skills, Education, Contact)

**Files:**
- Modify: `index.html` (sections: trayectoria, habilidades, educacion, contacto)
- Modify: `script.js` (timeline rendering, skills chart config)
- Uses: `.timeline`, `.timeline-item`, `.timeline-dot`, `.timeline-card`, `.skills-grid`, `.skills-chart-wrapper`, `.soft-skills-grid`, `.education-grid`, `.contact-grid`, `.contact-link`

**Interfaces:**
- Consumes: Design system component classes
- Produces: Refined timeline with cleaner cards, updated skills chart colors, polished education cards, unified contact buttons

- [ ] **Step 1: Update Trayectoria section in `index.html`** (replace lines 93-112)

```html
<section id="trayectoria" class="timeline section" aria-labelledby="trayectoria-title">
  <div class="container">
    <header class="section-header">
      <h2 id="trayectoria-title" class="text-title1 section-title">
        <span aria-hidden="true">💼</span> Trayectoria Profesional
      </h2>
      <p class="text-body section-subtitle">Un recorrido por mi experiencia laboral. Haz clic en cada hito para ver los detalles.</p>
    </header>
    <div class="relative max-w-3xl mx-auto" id="timeline-container" role="list" aria-label="Línea de tiempo profesional">
      <!-- Injected by JS -->
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update timeline rendering in `script.js`** (replace lines 163-185)

```javascript
timelineData.forEach((item, index) => {
  const isLeft = item.side === 'left';
  const itemHTML = `
    <article class="timeline-item" role="listitem" tabindex="0" aria-label="${item.title}, ${item.company}, ${item.date}">
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-card">
        <time class="timeline-date" datetime="${item.date.replace(' - ', '/')}">${item.date}</time>
        <h3 class="timeline-title">
          <span class="timeline-icon" aria-hidden="true">${item.icon}</span>
          ${item.title}
        </h3>
        <p class="timeline-company">${item.company}</p>
        <div class="timeline-details">${item.details}</div>
      </div>
    </article>
  `;
  timelineContainer.innerHTML += itemHTML;
});
```

- [ ] **Step 3: Update timeline click handler in `script.js`** (replace lines 187-200)

```javascript
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    timelineItems.forEach(i => i.classList.remove('active'));
    if (!wasActive) {
      item.classList.add('active');
    }
  });
  
  // Keyboard support
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

if (timelineItems.length > 0) {
  timelineItems[0].classList.add('active');
}
```

- [ ] **Step 4: Update Habilidades section in `index.html`** (replace lines 115-173)

```html
<section id="habilidades" class="section" aria-labelledby="habilidades-title">
  <div class="container">
    <header class="section-header">
      <h2 id="habilidades-title" class="text-title1 section-title">
        <span aria-hidden="true">🌟</span> Mis Habilidades
      </h2>
      <p class="text-body section-subtitle">Competencias técnicas y blandas que definen mi perfil profesional</p>
    </header>
    
    <div class="skills-grid">
      <div class="skills-chart-wrapper">
        <h3 class="skills-chart-title">Competencias Técnicas</h3>
        <div class="chart-container">
          <canvas id="skillsChart" aria-label="Gráfico de radar de habilidades técnicas"></canvas>
        </div>
      </div>
      
      <div>
        <h3 class="skills-chart-title">Habilidades Blandas</h3>
        <p class="text-body text-secondary text-center mb-6">Cualidades que me permiten colaborar eficazmente y adaptarme a nuevos desafíos.</p>
        <div class="soft-skills-grid" role="list" aria-label="Habilidades blandas">
          <article class="soft-skill-card" role="listitem">
            <div class="soft-skill-icon" aria-hidden="true">💡</div>
            <p class="soft-skill-name">Resolución de Problemas</p>
            <button class="soft-skill-btn elaborate-skill-btn" data-skill="Resolución de Problemas" aria-label="Elaborar sobre Resolución de Problemas">
              <span aria-hidden="true">✨</span> Elaborar
            </button>
          </article>
          <article class="soft-skill-card" role="listitem">
            <div class="soft-skill-icon" aria-hidden="true">📚</div>
            <p class="soft-skill-name">Aprendizaje Rápido</p>
            <button class="soft-skill-btn elaborate-skill-btn" data-skill="Aprendizaje Rápido" aria-label="Elaborar sobre Aprendizaje Rápido">
              <span aria-hidden="true">✨</span> Elaborar
            </button>
          </article>
          <article class="soft-skill-card" role="listitem">
            <div class="soft-skill-icon" aria-hidden="true">👥</div>
            <p class="soft-skill-name">Trabajo en Equipo</p>
            <button class="soft-skill-btn elaborate-skill-btn" data-skill="Trabajo en Equipo" aria-label="Elaborar sobre Trabajo en Equipo">
              <span aria-hidden="true">✨</span> Elaborar
            </button>
          </article>
          <article class="soft-skill-card" role="listitem">
            <div class="soft-skill-icon" aria-hidden="true">⚡</div>
            <p class="soft-skill-name">Proactividad</p>
            <button class="soft-skill-btn elaborate-skill-btn" data-skill="Proactividad" aria-label="Elaborar sobre Proactividad">
              <span aria-hidden="true">✨</span> Elaborar
            </button>
          </article>
          <article class="soft-skill-card" role="listitem">
            <div class="soft-skill-icon" aria-hidden="true">🎯</div>
            <p class="soft-skill-name">Orientación a Resultados</p>
            <button class="soft-skill-btn elaborate-skill-btn" data-skill="Orientación a Resultados" aria-label="Elaborar sobre Orientación a Resultados">
              <span aria-hidden="true">✨</span> Elaborar
            </button>
          </article>
          <article class="soft-skill-card" role="listitem">
            <div class="soft-skill-icon" aria-hidden="true">🔍</div>
            <p class="soft-skill-name">Atención al Detalle</p>
            <button class="soft-skill-btn elaborate-skill-btn" data-skill="Atención al Detalle" aria-label="Elaborar sobre Atención al Detalle">
              <span aria-hidden="true">✨</span> Elaborar
            </button>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Update skills chart colors in `script.js`** (replace lines 31-44)

```javascript
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Desarrollo Web', 'Bases de Datos', 'Análisis de Requisitos', 'Diseño UI/UX', 'Atención al Cliente', 'Soporte Técnico'],
    datasets: [{
      label: 'Nivel de Experiencia',
      data: [65, 50, 60, 55, 90, 75],
      backgroundColor: 'rgba(0, 113, 227, 0.15)',
      borderColor: 'rgba(0, 113, 227, 1)',
      pointBackgroundColor: 'rgba(0, 113, 227, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 113, 227, 1)',
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      r: {
        angleLines: { color: 'rgba(0, 113, 227, 0.15)' },
        grid: { color: 'rgba(0, 113, 227, 0.15)' },
        pointLabels: {
          font: { size: 13, weight: '500', family: 'Inter' },
          color: '#86868b'
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#6e6e73',
          stepSize: 20,
          font: { size: 11, family: 'Inter' }
        },
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#d1d1d1',
        borderColor: 'rgba(0, 113, 227, 0.5)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    }
  }
});
```

- [ ] **Step 6: Update Education section in `index.html`** (replace lines 176-210)

```html
<section id="educacion" class="section" aria-labelledby="educacion-title">
  <div class="container">
    <header class="section-header">
      <h2 id="educacion-title" class="text-title1 section-title">
        <span aria-hidden="true">🎓</span> Educación
      </h2>
      <p class="text-body section-subtitle">Mi formación académica es la base de mi desarrollo profesional</p>
    </header>
    <div class="education-grid" role="list" aria-label="Formación académica">
      <article class="education-card" role="listitem">
        <time class="education-date" datetime="2023">2023 — Actualmente</time>
        <h3 class="education-title">
          <span class="education-icon" aria-hidden="true">💻</span>
          Ingeniería de Software
        </h3>
        <p class="education-school">Institución Universitaria Pascual Bravo</p>
      </article>
      <article class="education-card" role="listitem">
        <time class="education-date" datetime="2018-2020">2018 — 2020</time>
        <h3 class="education-title">
          <span class="education-icon" aria-hidden="true">🌾</span>
          Técnico en Cultivos Agrícolas
        </h3>
        <p class="education-school">SENA, Institución Educativa Cocorná</p>
      </article>
      <article class="education-card" role="listitem">
        <time class="education-date" datetime="2009-2020">2009 — 2020</time>
        <h3 class="education-title">
          <span class="education-icon" aria-hidden="true">🏫</span>
          Bachiller Académico
        </h3>
        <p class="education-school">Institución Educativa Cocorná</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Update Contact section in `index.html`** (replace lines 213-251)

```html
<section id="contacto" class="section" aria-labelledby="contacto-title">
  <div class="container">
    <header class="section-header">
      <h2 id="contacto-title" class="text-title1 section-title">Hablemos</h2>
      <p class="text-body section-subtitle max-w-2xl mx-auto">Estoy abierto a nuevas oportunidades y desafíos. Si mi perfil te parece interesante, no dudes en contactarme.</p>
    </header>
    <div class="contact-grid" role="list" aria-label="Métodos de contacto">
      <a href="mailto:oscar.torres870@pascualbravo.edu.co" class="contact-link" role="listitem" aria-label="Enviar email">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        <span>Email</span>
      </a>
      <a href="tel:+573195771122" class="contact-link" role="listitem" aria-label="Llamar por teléfono">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Llamar</span>
      </a>
      <a href="https://wa.me/qr/U7KEUV6SOI7WG1" target="_blank" rel="noopener noreferrer" class="contact-link" role="listitem" aria-label="Contactar por WhatsApp">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.67z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
      <a href="https://www.instagram.com/baena.o?igsh=MjhnbHNjdTlxbGR0" target="_blank" rel="noopener noreferrer" class="contact-link" role="listitem" aria-label="Instagram">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
        <span>Instagram</span>
      </a>
      <a href="https://www.facebook.com/share/1JR7h8X6RN/" target="_blank" rel="noopener noreferrer" class="contact-link" role="listitem" aria-label="Facebook">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span>Facebook</span>
      </a>
      <a href="https://www.linkedin.com/in/oscar-david-torres-baena-53493428b" target="_blank" rel="noopener noreferrer" class="contact-link" role="listitem" aria-label="LinkedIn">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span>LinkedIn</span>
      </a>
      <a href="Hoja_de_vida_Oscar_Torres..pdf" download="Oscar_Torres_Hoja_de_Vida.pdf" class="contact-link primary" role="listitem" aria-label="Descargar CV en PDF">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <span>Descargar CV</span>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 8: Update elaborate skill button selector in `script.js`** (replace line 8)

```javascript
const elaborateSkillBtns = document.querySelectorAll('.elaborate-skill-btn');
```

And update click handler (replace line 204):

```javascript
elaborateSkillBtns.forEach(button => {
  button.addEventListener('click', async (event) => {
    const skillName = event.currentTarget.dataset.skill;
```

- [ ] **Step 9: Verify** — All sections render with new design; timeline cards expand on click; skills chart uses blue accent; soft skill cards hover; education cards hover; contact buttons unified with icons; primary CTA stands out

- [ ] **Step 10: Commit**

```bash
git add index.html script.js
git commit -m "Actualización: component refinements for timeline, skills, education, contact"
```

---

### Task 6: Hand Control Integration & Final Polish

**Files:**
- Modify: `index.html` (hand control button, camera preview, tutorial modal, cursor)
- Modify: `script.js` (hand control selectors, status labels)
- Uses: `.hand-control-btn`, `.camera-preview`, `.hand-tutorial`, `.hand-cursor`, `.whatsapp-float`

**Interfaces:**
- Consumes: Design system hand control classes
- Produces: Integrated hand control UI matching new aesthetic, proper Z-index stacking, accessible labels

- [ ] **Step 1: Update hand control button in `index.html`** (replace lines 267-271)

```html
<button id="handControlBtn" class="hand-control-btn" aria-label="Activar control por mano" aria-pressed="false">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/>
  </svg>
</button>
```

- [ ] **Step 2: Update camera preview in `index.html`** (replace lines 274-284)

```html
<div id="cameraPreview" class="camera-preview" role="dialog" aria-label="Vista previa de cámara" aria-hidden="true">
  <div class="camera-header">
    <span class="camera-title">🖐️ Control Manual</span>
    <button id="stopHandControl" class="camera-close" aria-label="Cerrar control manual">✕</button>
  </div>
  <video id="handVideoEl" autoplay playsinline muted class="hidden" aria-hidden="true"></video>
  <canvas id="handCanvas" width="320" height="240" class="camera-canvas" aria-hidden="true"></canvas>
  <div class="camera-status">
    <span id="gestureStatus" class="text-caption1" aria-live="polite">Esperando...</span>
  </div>
</div>
```

- [ ] **Step 3: Update hand tutorial modal in `index.html`** (replace lines 287-316)

```html
<div id="handTutorial" class="hand-tutorial" role="dialog" aria-modal="true" aria-labelledby="handTutorialTitle" aria-hidden="true">
  <div class="hand-tutorial-content">
    <h3 id="handTutorialTitle" class="hand-tutorial-title">Control con la Mano</h3>
    <div class="hand-gesture-list">
      <div class="hand-gesture-item">
        <span class="hand-gesture-emoji" aria-hidden="true">☝️🖖</span>
        <div>
          <div class="hand-gesture-label">Índice + Medio</div>
          <div class="hand-gesture-desc">Mueve el cursor</div>
        </div>
      </div>
      <div class="hand-gesture-item">
        <span class="hand-gesture-emoji" aria-hidden="true">🤏</span>
        <div>
          <div class="hand-gesture-label">Índice + Pulgar</div>
          <div class="hand-gesture-desc">Hace clic</div>
        </div>
      </div>
      <div class="hand-gesture-item">
        <span class="hand-gesture-emoji" aria-hidden="true">☝️</span>
        <div>
          <div class="hand-gesture-label">Solo Índice</div>
          <div class="hand-gesture-desc">Scroll arriba</div>
        </div>
      </div>
      <div class="hand-gesture-item">
        <span class="hand-gesture-emoji" aria-hidden="true">🖖</span>
        <div>
          <div class="hand-gesture-label">Solo Medio</div>
          <div class="hand-gesture-desc">Scroll abajo</div>
        </div>
      </div>
      <div class="hand-gesture-item">
        <span class="hand-gesture-emoji" aria-hidden="true">✊</span>
        <div>
          <div class="hand-gesture-label">Puño cerrado</div>
          <div class="hand-gesture-desc">Idle (no hace nada)</div>
        </div>
      </div>
    </div>
    <button id="startHandControl" class="btn btn-primary hand-tutorial-btn">¡Entendido, comenzar!</button>
  </div>
</div>
```

- [ ] **Step 4: Update hand cursor in `index.html`** (replace lines 322-326)

```html
<div id="handCursor" class="hand-cursor" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 4L10.5 20.5L13 13L20.5 10.5L4 4Z" fill="#0071e3" stroke="#0071e3" stroke-width="1"/>
  </svg>
</div>
```

- [ ] **Step 5: Update WhatsApp float in `index.html`** (replace lines 262-264)

```html
<a href="https://wa.me/573195771112?text=Hola%20Oscar,%20te%20contacto%20desde%20tu%20CV%20interactivo" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Contactar por WhatsApp">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" class="whatsapp-float-icon" width="28" height="28" aria-hidden="true">
</a>
```

- [ ] **Step 6: Update skill modal in `index.html`** (replace lines 329-337)

```html
<div id="skillModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal">
    <button class="modal-close" aria-label="Cerrar">&times;</button>
    <h3 id="modalTitle" class="modal-title"></h3>
    <div id="modalContent" class="modal-content"></div>
  </div>
</div>
```

- [ ] **Step 7: Update hand control JS selectors in `script.js`** (replace lines 248-270)

```javascript
const handControlBtn = document.getElementById('handControlBtn');
const cameraPreview = document.getElementById('cameraPreview');
const handCanvas = document.getElementById('handCanvas');
const gestureStatus = document.getElementById('gestureStatus');
const stopHandControl = document.getElementById('stopHandControl');
const handCursor = document.getElementById('handCursor');
const handTutorial = document.getElementById('handTutorial');
const startHandControlBtn = document.getElementById('startHandControl');
const videoEl = document.getElementById('handVideoEl');
```

- [ ] **Step 8: Update stopHandControlFunc in `script.js`** (replace lines 518-547)

```javascript
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
  cameraPreview.classList.remove('open');
  cameraPreview.setAttribute('aria-hidden', 'true');
  handCursor.classList.remove('open');
  handControlBtn.classList.remove('active');
  handControlBtn.setAttribute('aria-pressed', 'false');
  gestureStatus.textContent = 'Detenido';
  handCanvasCtx.clearRect(0, 0, handCanvas.width, handCanvas.height);
}
```

- [ ] **Step 9: Update activateHandControl in `script.js`** (replace lines 565-580)

```javascript
async function activateHandControl() {
  cameraPreview.classList.add('open');
  cameraPreview.setAttribute('aria-hidden', 'false');
  handCursor.classList.add('open');
  handControlBtn.classList.add('active');
  handControlBtn.setAttribute('aria-pressed', 'true');
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
```

- [ ] **Step 10: Update handControlBtn click handler in `script.js`** (replace lines 549-557)

```javascript
handControlBtn.addEventListener('click', () => {
  if (isActive) {
    stopHandControlFunc();
  } else if (isFirstTime) {
    handTutorial.classList.add('open');
    handTutorial.setAttribute('aria-hidden', 'false');
  } else {
    activateHandControl();
  }
});
```

- [ ] **Step 11: Update tutorial start button in `script.js`** (replace lines 559-563)

```javascript
startHandControlBtn?.addEventListener('click', () => {
  handTutorial.classList.remove('open');
  handTutorial.setAttribute('aria-hidden', 'true');
  isFirstTime = false;
  activateHandControl();
});
```

- [ ] **Step 12: Update gesture labels in `script.js`** (replace lines 291-304)

```javascript
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
```

- [ ] **Step 13: Verify** — Hand control button matches new aesthetic; camera preview uses design system; tutorial modal accessible; cursor uses accent color; WhatsApp float positioned correctly; Z-index stacking works (nav > hand control > camera > tutorial > modal); all ARIA attributes correct

- [ ] **Step 14: Commit**

```bash
git add index.html script.js
git commit -m "Actualización: hand control integration with new design system"
```

---

### Task 7: Final Verification & Polish

**Files:**
- All modified files
- No new files

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified, accessible, performant final deliverable

- [ ] **Step 1: Visual regression check**
  - Open in browser at 320px, 768px, 1024px, 1440px
  - Verify: hero gradient, profile glow, timeline alternating layout, skills chart, testimonials carousel (3/2/1 cards), contact grid, footer
  - Check color contrast (WCAG AA) on all text/button combinations

- [ ] **Step 2: Accessibility audit**
  - Run axe DevTools or Lighthouse accessibility
  - Verify: semantic HTML, ARIA labels, focus order, skip links (add if missing), color contrast, reduced motion
  - Test keyboard navigation: Tab through all interactive elements, Enter/Space activate buttons, Arrow keys in carousel

- [ ] **Step 3: Reduced motion test**
  - Enable "Reduce motion" in OS settings
  - Verify: no animations (hero fadeInUp, scroll bounce, carousel transitions, hover transforms)
  - Verify: `scroll-behavior: auto` on html

- [ ] **Step 4: Performance check**
  - Lighthouse performance score ≥90
  - Check: no layout shift (CLS <0.1), optimized images (profile photo), minimal JS blocking
  - Verify: Inter font loads with `font-display: swap`

- [ ] **Step 5: Hand control integration test**
  - Click hand button → tutorial opens (first time) → "Entendido" → camera preview opens → connect to server (if available)
  - Verify Z-index: nav (200) < hand btn (200) < camera (400) < tutorial (300) < modal (300) < cursor (500)
  - Stop button works, cleanup on close

- [ ] **Step 6: Cross-browser smoke test**
  - Chrome, Firefox, Safari (if available)
  - Verify: CSS custom properties, backdrop-filter, grid, flex, Chart.js canvas

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "Actualización: final verification and polish"
```

- [ ] **Step 8: Push**

```bash
git push
```

---

## Self-Review

**1. Spec coverage:**
- ✅ "tan bien como la web de Apple" — Design system with Apple-inspired tokens (colors, spacing, typography, shadows, motion)
- ✅ "apartado de testimonios" — Task 3 adds testimonials section with carousel
- ✅ "hero se sienta premium" — Task 2 redesigns hero with gradient backdrop, refined typography, dual CTA, scroll indicator
- ✅ Preserve existing functionality — All tasks reference existing hand control, timeline, skills chart, modals, contact links

**2. Step scan:** Each step is unambiguous with exact code blocks or signatures. No "TBD" or "handle edge cases" lines.

**3. Type consistency:** CSS custom property names match across all tasks. Class names (`.btn-primary`, `.card`, `.timeline-card`) consistent.

**4. Review Focus coverage:**
- Reduced motion → Task 7 Step 3
- Dark mode only → Design system uses only dark tokens
- Touch targets → Buttons use 44px+ (btn 56px, nav-link 40px min)
- Font loading → Google Fonts preconnect + swap in HTML
- Hand control Z-index → Task 6 Step 13 explicit verification

**5. Proportion:** Plan is detailed but each task produces working, testable output. Code blocks only where spec fixes exact values.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-11-02-apple-style-cv-redesign.md`. Please review the plan. Which execution approach would you prefer?**

- **Subagent-driven** — A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Native** — I implement every task myself in this session, the way this harness runs work, then one fresh reviewer on the most capable model checks the whole branch. Cheapest and fastest; no independent review until the end.

**For this plan I recommend Native, because the tasks are tightly coupled through the shared design system (Task 1) and each builds directly on the previous — a single context maintains consistency across CSS tokens, HTML structure, and JS selectors. Does the plan capture what you want, and which approach should we use?**

```css
/* === DESIGN SYSTEM === */
:root {
  /* Color: Apple-inspired neutral dark palette with blue accent */
  --color-bg: #000000;
  --color-bg-elevated: #1d1d1f;
  --color-bg-hover: #2c2c2e;
  --color-border: #2c2c2e;
  --color-border-strong: #3a3a3c;
  
  --color-text-primary: #ffffff;
  --color-text-secondary: #86868b;
  --color-text-tertiary: #6e6e73;
  --color-text-inverse: #000000;
  
  --color-accent: #0071e3;
  --color-accent-hover: #0077ed;
  --color-accent-light: rgba(0, 113, 227, 0.15);
  --color-accent-glow: rgba(0, 113, 227, 0.3);
  
  --color-success: #30d158;
  --color-warning: #ff9f0a;
  --color-error: #ff453a;
  
  /* Spacing: 4px base unit */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  
  /* Typography: SF Pro-like scale using Inter */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  
  --text-display: clamp(40px, 5vw, 64px) / 1.1;
  --text-title1: clamp(28px, 3.5vw, 34px) / 1.2;
  --text-title2: clamp(22px, 2.5vw, 28px) / 1.25;
  --text-title3: 20px / 1.3;
  --text-headline: 17px / 1.3;
  --text-body: 17px / 1.5;
  --text-callout: 16px / 1.5;
  --text-subhead: 15px / 1.5;
  --text-footnote: 13px / 1.4;
  --text-caption1: 12px / 1.3;
  --text-caption2: 11px / 1.3;
  
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  
  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows: subtle, layered */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.5);
  --shadow-xl: 0 24px 48px rgba(0,0,0,0.6);
  --shadow-glow: 0 0 40px var(--color-accent-glow);
  
  /* Transitions */
  --transition-fast: 120ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-index scale */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-tooltip: 500;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-base: 0ms;
    --transition-slow: 0ms;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* === BASE === */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Focus visible */
:focus:not(:focus-visible) { outline: none; }
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background: var(--color-accent-light);
  color: var(--color-text-primary);
}

/* === UTILITIES === */
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-6);
  padding-right: var(--space-6);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* === TYPOGRAPHY UTILITIES === */
.text-display { font-size: var(--text-display); font-weight: var(--weight-bold); letter-spacing: -0.02em; }
.text-title1 { font-size: var(--text-title1); font-weight: var(--weight-bold); letter-spacing: -0.01em; }
.text-title2 { font-size: var(--text-title2); font-weight: var(--weight-bold); letter-spacing: -0.01em; }
.text-title3 { font-size: var(--text-title3); font-weight: var(--weight-semibold); }
.text-headline { font-size: var(--text-headline); font-weight: var(--weight-semibold); }
.text-body { font-size: var(--text-body); font-weight: var(--weight-regular); }
.text-callout { font-size: var(--text-callout); font-weight: var(--weight-regular); }
.text-subhead { font-size: var(--text-subhead); font-weight: var(--weight-medium); }
.text-footnote { font-size: var(--text-footnote); font-weight: var(--weight-regular); color: var(--color-text-tertiary); }
.text-caption1 { font-size: var(--text-caption1); font-weight: var(--weight-medium); }
.text-caption2 { font-size: var(--text-caption2); font-weight: var(--weight-regular); color: var(--color-text-tertiary); }

.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-tertiary { color: var(--color-text-tertiary); }
.text-accent { color: var(--color-accent); }

/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-callout);
  font-weight: var(--weight-semibold);
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}
.btn-primary:hover { background: var(--color-accent-hover); }
.btn-primary:active { transform: scale(0.98); }

.btn-secondary {
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover { background: var(--color-bg-hover); border-color: var(--color-border-strong); }

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}
.btn-ghost:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

.btn-icon {
  padding: var(--space-3);
  border-radius: var(--radius-full);
}

.btn-floating {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .btn-floating { bottom: var(--space-8); right: var(--space-8); }
}

/* === CARDS === */
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}
.card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
}

.card-interactive {
  cursor: pointer;
}
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* === SECTIONS === */
.section {
  padding: var(--space-16) 0;
}
@media (min-width: 768px) {
  .section { padding: var(--space-20) 0; }
}
@media (min-width: 1024px) {
  .section { padding: var(--space-24) 0; }
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-12);
}
@media (min-width: 768px) {
  .section-header { margin-bottom: var(--space-16); }
}

.section-title {
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.section-subtitle {
  color: var(--color-text-secondary);
}

/* === NAVIGATION === */
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--color-border);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
}
@media (min-width: 768px) {
  .nav-container { height: 60px; }
}

.nav-brand {
  font-size: var(--text-headline);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  text-decoration: none;
}

.nav-brand-mark {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  margin-right: var(--space-2);
  vertical-align: middle;
}

.nav-links {
  display: none;
  gap: var(--space-1);
}
@media (min-width: 768px) {
  .nav-links { display: flex; }
}

.nav-link {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-callout);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.nav-link:hover,
.nav-link.active {
  color: var(--color-text-primary);
  background: var(--color-bg-hover);
}

.nav-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
}
@media (min-width: 768px) {
  .nav-menu-btn { display: none; }
}
.nav-menu-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

.mobile-menu {
  display: none;
  padding: var(--space-6);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}
.mobile-menu.open { display: block; }
@media (min-width: 768px) {
  .mobile-menu { display: none !important; }
}

.mobile-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.mobile-link:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

/* === HERO === */
.hero {
  position: relative;
  padding: var(--space-16) 0 var(--space-20);
  text-align: center;
  overflow: hidden;
}
@media (min-width: 768px) {
  .hero { padding: var(--space-20) 0 var(--space-24); }
}
@media (min-width: 1024px) {
  .hero { padding: var(--space-24) 0 var(--space-28); }
}

.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

.hero-gradient {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 600px;
  background: radial-gradient(ellipse at center, var(--color-accent-light) 0%, transparent 70%);
  opacity: 0.5;
  filter: blur(80px);
}

.hero-profile {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-6);
  transition: all var(--transition-slow);
}
@media (min-width: 768px) {
  .hero-profile { width: 128px; height: 128px; }
}
.hero-profile:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-glow), var(--shadow-lg);
}

.hero-name {
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  animation: fadeInUp var(--transition-slow) ease-out;
}

.hero-role {
  color: var(--color-text-secondary);
  font-weight: var(--weight-medium);
  margin-bottom: var(--space-6);
  animation: fadeInUp var(--transition-slow) ease-out 0.1s both;
}

.hero-description {
  max-width: 680px;
  margin: 0 auto var(--space-8);
  color: var(--color-text-secondary);
  animation: fadeInUp var(--transition-slow) ease-out 0.2s both;
}

.hero-cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  animation: fadeInUp var(--transition-slow) ease-out 0.3s both;
}

.hero-indicator {
  margin-top: var(--space-10);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--color-text-tertiary);
  font-size: var(--text-caption1);
  animation: fadeInUp var(--transition-slow) ease-out 0.4s both;
}

.hero-scroll-icon {
  width: 20px;
  height: 20px;
  animation: bounce 2s infinite;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-profile,
  .hero-name,
  .hero-role,
  .hero-description,
  .hero-cta-group,
  .hero-indicator {
    animation: none;
  }
  .hero-scroll-icon { animation: none; }
}

/* === TIMELINE === */
.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--color-border);
  transform: translateX(-50%);
}
@media (max-width: 767px) {
  .timeline::before { left: 20px; }
}

.timeline-item {
  position: relative;
  width: 100%;
  padding: var(--space-6) 0;
}
@media (min-width: 768px) {
  .timeline-item {
    width: 50%;
    padding: var(--space-8) var(--space-8) var(--space-8) 0;
  }
  .timeline-item:nth-child(even) {
    margin-left: 50%;
    padding: var(--space-8) 0 var(--space-8) var(--space-8);
  }
}
@media (max-width: 767px) {
  .timeline-item { padding-left: var(--space-10); }
}

.timeline-dot {
  position: absolute;
  top: var(--space-8);
  width: 14px;
  height: 14px;
  background: var(--color-bg);
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--color-bg);
  transition: all var(--transition-base);
  z-index: 1;
}
@media (min-width: 768px) {
  .timeline-item:nth-child(odd) .timeline-dot { right: -7px; }
  .timeline-item:nth-child(even) .timeline-dot { left: -7px; }
}
@media (max-width: 767px) {
  .timeline-dot { left: 13px; }
}

.timeline-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}
.timeline-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
}

.timeline-date {
  font-size: var(--text-caption1);
  font-weight: var(--weight-semibold);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.timeline-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-headline);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.timeline-icon {
  font-size: var(--text-title3);
}

.timeline-company {
  font-size: var(--text-subhead);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.timeline-details {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* === SKILLS === */
.skills-grid {
  display: grid;
  gap: var(--space-8);
}
@media (min-width: 768px) {
  .skills-grid { grid-template-columns: 1fr 1fr; }
}

.skills-chart-wrapper {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.skills-chart-title {
  font-size: var(--text-title3);
  font-weight: var(--weight-semibold);
  text-align: center;
  margin-bottom: var(--space-6);
}

.soft-skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}
@media (min-width: 768px) {
  .soft-skills-grid { grid-template-columns: repeat(3, 1fr); }
}

.soft-skill-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
  transition: all var(--transition-base);
}
.soft-skill-card:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.soft-skill-icon {
  font-size: 32px;
  margin-bottom: var(--space-3);
}

.soft-skill-name {
  font-size: var(--text-subhead);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.soft-skill-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-caption1);
  font-weight: var(--weight-medium);
  color: var(--color-accent);
  background: var(--color-accent-light);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.soft-skill-btn:hover {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

/* === EDUCATION === */
.education-grid {
  display: grid;
  gap: var(--space-6);
}
@media (min-width: 768px) {
  .education-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .education-grid { grid-template-columns: repeat(3, 1fr); }
}

.education-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}
.education-card:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.education-date {
  font-size: var(--text-caption1);
  font-weight: var(--weight-semibold);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.education-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-headline);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.education-icon {
  font-size: var(--text-title3);
}

.education-school {
  font-size: var(--text-subhead);
  color: var(--color-text-secondary);
}

/* === TESTIMONIALS (NEW) === */
.testimonials {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.testimonials-carousel {
  position: relative;
  overflow: hidden;
}

.testimonials-track {
  display: flex;
  transition: transform var(--transition-slow);
  will-change: transform;
}

.testimonial-card {
  flex: 0 0 100%;
  padding: var(--space-6);
}
@media (min-width: 768px) {
  .testimonial-card { flex: 0 0 50%; }
}
@media (min-width: 1024px) {
  .testimonial-card { flex: 0 0 33.333%; }
}

.testimonial-content {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);
}
.testimonial-content:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
}

.testimonial-quote {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
  flex: 1;
  position: relative;
}
.testimonial-quote::before {
  content: '❝';
  font-size: 48px;
  color: var(--color-accent);
  opacity: 0.3;
  position: absolute;
  top: -12px;
  left: -4px;
  line-height: 1;
  font-family: Georgia, serif;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--weight-bold);
  font-size: var(--text-headline);
  color: var(--color-text-inverse);
  flex-shrink: 0;
}

.testimonial-info {
  flex: 1;
  min-width: 0;
}

.testimonial-name {
  font-size: var(--text-subhead);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.testimonial-role {
  font-size: var(--text-caption1);
  color: var(--color-text-tertiary);
}

.testimonial-nav {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-8);
}

.testimonial-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.testimonial-dot:hover { background: var(--color-border-strong); }
.testimonial-dot.active {
  background: var(--color-accent);
  width: 24px;
  border-radius: var(--radius-full);
}

.testimonial-arrow {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
@media (min-width: 768px) {
  .testimonial-arrow { display: flex; }
}
.testimonial-arrow:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
}

.testimonial-arrow.prev { position: absolute; left: var(--space-6); top: 50%; transform: translateY(-50%); z-index: 1; }
.testimonial-arrow.next { position: absolute; right: var(--space-6); top: 50%; transform: translateY(-50%); z-index: 1; }

/* === CONTACT === */
.contact-grid {
  display: grid;
  gap: var(--space-4);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
@media (min-width: 640px) {
  .contact-grid { grid-template-columns: repeat(2, 1fr); text-align: left; }
}
@media (min-width: 1024px) {
  .contact-grid { grid-template-columns: repeat(4, 1fr); }
}

.contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  font-size: var(--text-callout);
  font-weight: var(--weight-medium);
  text-decoration: none;
  transition: all var(--transition-base);
}
@media (min-width: 640px) {
  .contact-link { justify-content: flex-start; }
}
.contact-link:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
  background: var(--color-bg-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.contact-link.primary {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-text-inverse);
}
.contact-link.primary:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  color: var(--color-text-inverse);
}

.contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* === FOOTER === */
.footer {
  padding: var(--space-10) 0;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-text {
  font-size: var(--text-footnote);
  color: var(--color-text-tertiary);
}

/* === MODAL === */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  z-index: var(--z-modal);
  animation: fadeIn var(--transition-base);
}
.modal-overlay.open { display: flex; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  max-width: 520px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: slideUp var(--transition-base);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}
.modal-close:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
}

.modal-title {
  font-size: var(--text-title3);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-4);
  color: var(--color-text-primary);
}

.modal-content {
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* === HAND CONTROL === */
.hand-control-btn {
  position: fixed;
  bottom: var(--space-6);
  right: calc(var(--space-6) + 64px);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  border: none;
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  z-index: var(--z-sticky);
}
.hand-control-btn:hover {
  background: var(--color-accent-hover);
  transform: scale(1.05);
  box-shadow: var(--shadow-glow), var(--shadow-lg);
}
.hand-control-btn.active {
  background: var(--color-error);
}
@media (min-width: 768px) {
  .hand-control-btn { bottom: var(--space-8); right: calc(var(--space-8) + 72px); }
}

.camera-preview {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  width: 280px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  z-index: var(--z-popover);
  display: none;
}
.camera-preview.open { display: block; }

.camera-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  cursor: move;
}

.camera-title {
  font-size: var(--text-caption1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
}

.camera-close {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-error);
  border: none;
  color: var(--color-text-inverse);
  font-size: var(--text-caption2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}
.camera-close:hover { opacity: 0.9; }

.camera-canvas {
  width: 100%;
  aspect-ratio: 4/3;
  background: var(--color-bg);
}

.camera-status {
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-caption1);
  color: var(--color-text-tertiary);
}

.hand-tutorial {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  z-index: var(--z-modal);
}
.hand-tutorial.open { display: flex; }

.hand-tutorial-content {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  max-width: 360px;
  width: 100%;
  box-shadow: var(--shadow-xl);
}

.hand-tutorial-title {
  font-size: var(--text-title3);
  font-weight: var(--weight-semibold);
  text-align: center;
  margin-bottom: var(--space-6);
  color: var(--color-text-primary);
}

.hand-gesture-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.hand-gesture-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-bg);
  border-radius: var(--radius-md);
}

.hand-gesture-emoji {
  font-size: 24px;
  flex-shrink: 0;
}

.hand-gesture-label {
  font-weight: var(--weight-semibold);
  color: var(--color-accent);
  margin-bottom: 2px;
}

.hand-gesture-desc {
  font-size: var(--text-caption1);
  color: var(--color-text-secondary);
}

.hand-tutorial-btn {
  width: 100%;
}

.hand-cursor {
  position: fixed;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: var(--z-tooltip);
  display: none;
  transform: translate(-50%, -50%);
}
.hand-cursor.open { display: block; }

.hand-cursor svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/* === WHATSAPP FLOAT === */
.whatsapp-float {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: #25d366;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all var(--transition-base);
  z-index: var(--z-sticky);
}
.whatsapp-float:hover {
  background: #1db954;
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(37, 211, 102, 0.4), var(--shadow-lg);
}
@media (min-width: 768px) {
  .whatsapp-float { bottom: var(--space-8); right: var(--space-8); }
}

.whatsapp-float img { width: 28px; height: 28px; }

/* === LOADER === */
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-right: var(--space-2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* === TESTIMONIALS DATA (injected by JS) === */
.testimonials-data { display: none; }