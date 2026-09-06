// ============================================
// Tema claro / oscuro
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;
const savedTheme = localStorage.getItem('evolve-theme');

let activeAccentRGB = '0, 245, 255';

function readAccentRGB() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--color-cyan-rgb').trim();
  activeAccentRGB = value || activeAccentRGB;
}

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀';
  } else {
    root.removeAttribute('data-theme');
    themeIcon.textContent = '☾';
  }
  readAccentRGB();
}

if (savedTheme) applyTheme(savedTheme);
else readAccentRGB();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('evolve-theme', next);
  });
}

// ============================================
// Efecto de escritura tipo terminal en el hero
// ============================================
const typewriterEl = document.getElementById('typewriter-text');

if (typewriterEl) {
  const fullText = 'DE LA RUEDA A LA INTELIGENCIA ARTIFICIAL';
  let i = 0;

  function typeChar() {
    if (i <= fullText.length) {
      typewriterEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeChar, 45);
    }
  }

  typeChar();
}
// ============================================
// Efecto de escritura tipo terminal en nosotros
// ============================================
const nosotrosTypewriterEl = document.getElementById('nosotros-typewriter');

if (nosotrosTypewriterEl) {

  const fullTextNosotros = '"Tecnologia y educacion transformando a El salvador"';

  let j = 0;

  function typeNosotros() {

    if (j <= fullTextNosotros.length) {

      nosotrosTypewriterEl.textContent = fullTextNosotros.slice(0, j);

      j++;

      setTimeout(typeNosotros, 45);
    }

  }

  typeNosotros();

}


// ============================================
// Barra de progreso de scroll
// ============================================
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = percent + '%';
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ============================================
// Menú móvil
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ============================================
// Línea de tiempo: expandir/contraer al hacer clic
// ============================================
document.querySelectorAll('.timeline-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.closest('.timeline-item').classList.toggle('expanded');
  });
});

// ============================================
// Revelar items de la línea de tiempo al hacer scroll
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

if ('IntersectionObserver' in window && timelineItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach((item) => revealObserver.observe(item));
} else {
  // Fallback: mostrar todo de una vez si no hay soporte
  timelineItems.forEach((item) => item.classList.add('in-view'));
}

// ============================================
// Contadores animados de estadísticas
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window && statNumbers.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => statObserver.observe(el));
}

// ============================================
// Fondo animado de partículas conectadas
// ============================================
const canvas = document.getElementById('particle-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(70, Math.floor((width * height) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(${activeAccentRGB}, ${0.12 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      ctx.fillStyle = `rgba(${activeAccentRGB}, 0.6)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  resize();
  createParticles();
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  if (!prefersReducedMotion) {
    draw();
  }
}

// ============================================
// Modo presentación: diapositivas de pantalla completa
// ============================================
const presentationToggle = document.getElementById('presentation-toggle');
const presentationOverlay = document.getElementById('presentation-overlay');
const presentationClose = document.getElementById('presentation-close');
const slideEl = document.querySelector('.presentation-slide');
const slideYear = document.getElementById('slide-year');
const slideTitle = document.getElementById('slide-title');
const slideSummary = document.getElementById('slide-summary');
const slideDetail = document.getElementById('slide-detail');
const slidePrev = document.getElementById('slide-prev');
const slideNext = document.getElementById('slide-next');
const slideAutoplay = document.getElementById('slide-autoplay');
const dotsContainer = document.getElementById('presentation-dots');
const presentationCounter = document.getElementById('presentation-counter');

if (presentationToggle && timelineItems.length && presentationOverlay) {
  // Construye la lista de diapositivas a partir de los hitos ya presentes en la página
  const slides = Array.from(timelineItems).map((item) => ({
    year: item.querySelector('.timeline-year').textContent,
    title: item.querySelector('h3').textContent,
    summary: item.querySelector('.timeline-summary').textContent,
    detail: item.querySelector('.timeline-detail').textContent,
  }));

  let currentSlide = 0;
  let autoplayTimer = null;

  // Genera los puntos de navegación
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir a la diapositiva ${idx + 1}`);
    dot.addEventListener('click', () => showSlide(idx));
    dotsContainer.appendChild(dot);
  });

  function renderSlide(idx) {
    const s = slides[idx];
    slideYear.textContent = s.year;
    slideTitle.textContent = s.title;
    slideSummary.textContent = s.summary;
    slideDetail.textContent = s.detail;
    presentationCounter.textContent = `${idx + 1} / ${slides.length}`;

    dotsContainer.querySelectorAll('button').forEach((dot, dotIdx) => {
      dot.classList.toggle('active', dotIdx === idx);
    });
  }

  function showSlide(idx) {
    currentSlide = (idx + slides.length) % slides.length;
    slideEl.classList.remove('visible');
    setTimeout(() => {
      renderSlide(currentSlide);
      slideEl.classList.add('visible');
    }, 150);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
    slideAutoplay.classList.remove('is-playing');
    slideAutoplay.textContent = '▶';
  }

  function startAutoplay() {
    slideAutoplay.classList.add('is-playing');
    slideAutoplay.textContent = '❚❚';
    autoplayTimer = setInterval(() => showSlide(currentSlide + 1), 4000);
  }

  function openPresentation() {
    presentationOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    currentSlide = 0;
    renderSlide(currentSlide);
    requestAnimationFrame(() => slideEl.classList.add('visible'));
  }

  function closePresentation() {
    presentationOverlay.classList.remove('open');
    document.body.style.overflow = '';
    stopAutoplay();
  }

  presentationToggle.addEventListener('click', openPresentation);
  presentationClose.addEventListener('click', closePresentation);
  slidePrev.addEventListener('click', () => { stopAutoplay(); showSlide(currentSlide - 1); });
  slideNext.addEventListener('click', () => { stopAutoplay(); showSlide(currentSlide + 1); });

  slideAutoplay.addEventListener('click', () => {
    if (autoplayTimer) stopAutoplay();
    else startAutoplay();
  });

  document.addEventListener('keydown', (e) => {
    if (!presentationOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closePresentation();
    if (e.key === 'ArrowRight') { stopAutoplay(); showSlide(currentSlide + 1); }
    if (e.key === 'ArrowLeft') { stopAutoplay(); showSlide(currentSlide - 1); }
  });
}

// ============================================
// Rastro del cursor
// ============================================
const cursorCanvas = document.getElementById('cursor-trail-canvas');

if (cursorCanvas) {
  const cctx = cursorCanvas.getContext('2d');
  let trailPoints = [];
  const prefersReducedMotionCursor = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  function resizeCursorCanvas() {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  }

  resizeCursorCanvas();
  window.addEventListener('resize', resizeCursorCanvas);

  if (!prefersReducedMotionCursor && !isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      trailPoints.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trailPoints.length > 24) trailPoints.shift();
    });

    function drawTrail() {
      cctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

      trailPoints.forEach((p, idx) => {
        p.life -= 0.045;
      });
      trailPoints = trailPoints.filter((p) => p.life > 0);

      trailPoints.forEach((p, idx) => {
        const radius = 5 * p.life;
        const gradient = cctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        gradient.addColorStop(0, `rgba(${activeAccentRGB}, ${0.5 * p.life})`);
        gradient.addColorStop(1, `rgba(${activeAccentRGB}, 0)`);
        cctx.fillStyle = gradient;
        cctx.beginPath();
        cctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        cctx.fill();
      });

      requestAnimationFrame(drawTrail);
    }

    drawTrail();
  }
}