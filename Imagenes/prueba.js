/* =========================================
   EVOLVE — JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* =========================================
     ELEMENTOS PRINCIPALES
     ========================================= */

  const body = document.body;

  const mainNav = document.getElementById('main-nav');
  const menuToggle = document.getElementById('menu-toggle');

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const scrollProgress = document.getElementById('scroll-progress');

  const typewriterEl = document.getElementById('typewriter-text');

  const particleCanvas = document.getElementById('particle-canvas');
  const cursorCanvas = document.getElementById('cursor-trail-canvas');


  /* =========================================
     MENÚ PRINCIPAL
     ========================================= */

  if (menuToggle && mainNav) {

    menuToggle.addEventListener('click', function () {

      const isOpen = mainNav.classList.toggle('open');

      menuToggle.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );

      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú' : 'Abrir menú'
      );

    });


    // Cerrar menú al seleccionar una sección
    const navLinks = mainNav.querySelectorAll('a');

    navLinks.forEach(function (link) {

      link.addEventListener('click', function () {

        mainNav.classList.remove('open');

        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        menuToggle.setAttribute(
          'aria-label',
          'Abrir menú'
        );

      });

    });


    // Cerrar menú con Escape
    document.addEventListener('keydown', function (event) {

      if (event.key === 'Escape') {

        mainNav.classList.remove('open');

        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        menuToggle.setAttribute(
          'aria-label',
          'Abrir menú'
        );

      }

    });

  }


  /* =========================================
     TEMA CLARO / OSCURO
     ========================================= */

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem('evolve-theme');
  } catch (error) {
    savedTheme = null;
  }


  if (savedTheme === 'light') {

    body.setAttribute('data-theme', 'light');

    if (themeIcon) {
      themeIcon.textContent = '☀';
    }

  } else {

    body.removeAttribute('data-theme');

    if (themeIcon) {
      themeIcon.textContent = '☾';
    }

  }


  if (themeToggle) {

    themeToggle.addEventListener('click', function () {

      const isLight =
        body.getAttribute('data-theme') === 'light';


      if (isLight) {

        body.removeAttribute('data-theme');

        try {
          localStorage.setItem('evolve-theme', 'dark');
        } catch (error) {
          // No hacer nada si localStorage está bloqueado
        }

        if (themeIcon) {
          themeIcon.textContent = '☾';
        }

      } else {

        body.setAttribute('data-theme', 'light');

        try {
          localStorage.setItem('evolve-theme', 'light');
        } catch (error) {
          // No hacer nada si localStorage está bloqueado
        }

        if (themeIcon) {
          themeIcon.textContent = '☀';
        }

      }

    });

  }


  /* =========================================
     EFECTO TYPEWRITER
     ========================================= */

  if (typewriterEl) {

    const fullText =
      'DE LA RUEDA A LA INTELIGENCIA ARTIFICIAL';

    let index = 0;


    function typeChar() {

      if (index <= fullText.length) {

        typewriterEl.textContent =
          fullText.slice(0, index);

        index++;

        setTimeout(typeChar, 65);

      }

    }


    typeChar();

  }


  /* =========================================
     BARRA DE PROGRESO
     ========================================= */

  function updateScrollProgress() {

    if (!scrollProgress) {
      return;
    }


    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    if (documentHeight <= 0) {

      scrollProgress.style.width = '0%';

      return;

    }


    const progress =
      (scrollTop / documentHeight) * 100;


    scrollProgress.style.width =
      Math.min(progress, 100) + '%';

  }


  window.addEventListener(
    'scroll',
    updateScrollProgress,
    { passive: true }
  );


  updateScrollProgress();


  /* =========================================
     ANIMACIÓN DE LA LÍNEA DE TIEMPO
     ========================================= */

  const timelineItems =
    document.querySelectorAll('.timeline-item');


  if (
    timelineItems.length &&
    'IntersectionObserver' in window
  ) {

    const timelineObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'in-view'
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    timelineItems.forEach(function (item) {

      timelineObserver.observe(item);

    });

  } else {

    timelineItems.forEach(function (item) {

      item.classList.add('in-view');

    });

  }


  /* =========================================
     EXPANDIR TARJETAS
     ========================================= */

  const timelineCards =
    document.querySelectorAll('.timeline-card');


  timelineCards.forEach(function (card) {

    card.addEventListener('click', function () {

      const item =
        card.closest('.timeline-item');


      if (!item) {
        return;
      }


      item.classList.toggle('expanded');

    });

  });


  /* =========================================
     PARTÍCULAS DE FONDO
     ========================================= */

  if (particleCanvas) {

    const ctx =
      particleCanvas.getContext('2d');


    if (ctx) {

      let particles = [];

      let animationFrame = null;


      function resizeParticleCanvas() {

        const dpr =
          Math.min(
            window.devicePixelRatio || 1,
            2
          );


        particleCanvas.width =
          window.innerWidth * dpr;

        particleCanvas.height =
          window.innerHeight * dpr;


        particleCanvas.style.width =
          window.innerWidth + 'px';

        particleCanvas.style.height =
          window.innerHeight + 'px';


        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );

      }


      function createParticles() {

        particles = [];


        const amount =
          Math.min(
            100,
            Math.max(
              35,
              Math.floor(
                (
                  window.innerWidth *
                  window.innerHeight
                ) / 18000
              )
            )
          );


        for (let i = 0; i < amount; i++) {

          particles.push({

            x:
              Math.random() *
              window.innerWidth,

            y:
              Math.random() *
              window.innerHeight,

            size:
              Math.random() * 1.7 + 0.4,

            speedX:
              (Math.random() - 0.5) * 0.18,

            speedY:
              (Math.random() - 0.5) * 0.18,

            opacity:
              Math.random() * 0.55 + 0.15

          });

        }

      }


      function drawParticles() {

        ctx.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );


        const cyan =
          getComputedStyle(body)
            .getPropertyValue('--color-cyan')
            .trim();


        particles.forEach(function (particle) {

          particle.x += particle.speedX;
          particle.y += particle.speedY;


          if (particle.x < -10) {

            particle.x =
              window.innerWidth + 10;

          }


          if (particle.x >
              window.innerWidth + 10) {

            particle.x = -10;

          }


          if (particle.y < -10) {

            particle.y =
              window.innerHeight + 10;

          }


          if (particle.y >
              window.innerHeight + 10) {

            particle.y = -10;

          }


          ctx.beginPath();


          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            cyan || '#00F5FF';

          ctx.globalAlpha =
            particle.opacity;


          ctx.fill();

        });


        ctx.globalAlpha = 1;


        animationFrame =
          requestAnimationFrame(
            drawParticles
          );

      }


      resizeParticleCanvas();

      createParticles();

      drawParticles();


      window.addEventListener(
        'resize',
        function () {

          resizeParticleCanvas();

          createParticles();

        }
      );


      window.addEventListener(
        'beforeunload',
        function () {

          if (animationFrame) {

            cancelAnimationFrame(
              animationFrame
            );

          }

        }
      );

    }

  }


  /* =========================================
     RASTRO DEL CURSOR
     ========================================= */

  if (cursorCanvas) {

    const ctx =
      cursorCanvas.getContext('2d');


    if (ctx) {

      let points = [];

      const maxPoints = 18;

      let mouseX = -100;
      let mouseY = -100;


      function resizeCursorCanvas() {

        const dpr =
          Math.min(
            window.devicePixelRatio || 1,
            2
          );


        cursorCanvas.width =
          window.innerWidth * dpr;

        cursorCanvas.height =
          window.innerHeight * dpr;


        cursorCanvas.style.width =
          window.innerWidth + 'px';

        cursorCanvas.style.height =
          window.innerHeight + 'px';


        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );

      }


      document.addEventListener(
        'mousemove',
        function (event) {

          mouseX = event.clientX;
          mouseY = event.clientY;


          points.push({

            x: mouseX,

            y: mouseY,

            life: 1

          });


          if (points.length > maxPoints) {

            points.shift();

          }

        }
      );


      function drawCursorTrail() {

        ctx.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );


        const cyan =
          getComputedStyle(body)
            .getPropertyValue('--color-cyan')
            .trim();


        const safeColor =
          cyan || '#00F5FF';


        for (
          let i = 0;
          i < points.length;
          i++
        ) {

          const point = points[i];


          point.life -= 0.045;


          const position =
            points.length > 0
              ? i / points.length
              : 0;


          const alpha =
            Math.max(0, point.life) *
            position;


          ctx.beginPath();


          ctx.arc(
            point.x,
            point.y,
            1.5 + position * 2,
            0,
            Math.PI * 2
          );


          ctx.fillStyle = safeColor;

          ctx.globalAlpha =
            alpha * 0.5;


          ctx.fill();

        }


        points =
          points.filter(function (point) {

            return point.life > 0;

          });


        // Punto luminoso del cursor
        if (
          mouseX > 0 &&
          mouseY > 0
        ) {

          ctx.beginPath();


          ctx.arc(
            mouseX,
            mouseY,
            2,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            safeColor;

          ctx.globalAlpha = 0.8;

          ctx.fill();

        }


        ctx.globalAlpha = 1;


        requestAnimationFrame(
          drawCursorTrail
        );

      }


      resizeCursorCanvas();

      drawCursorTrail();


      window.addEventListener(
        'resize',
        resizeCursorCanvas
      );

    }

  }


  /* =========================================
     ESTADÍSTICAS ANIMADAS
     ========================================= */

  const statNumbers =
    document.querySelectorAll('.stat-number');


  if (statNumbers.length) {

    const animatedStats =
      new WeakSet();


    function animateNumber(element) {

      if (animatedStats.has(element)) {

        return;

      }


      animatedStats.add(element);


      const target =
        Number(
          element.getAttribute('data-target')
        );


      const suffix =
        element.getAttribute('data-suffix') || '';


      const duration = 1300;

      const startTime =
        performance.now();


      function updateNumber(currentTime) {

        const elapsed =
          currentTime - startTime;


        const progress =
          Math.min(
            elapsed / duration,
            1
          );


        const eased =
          1 - Math.pow(
            1 - progress,
            3
          );


        const value =
          Math.round(
            target * eased
          );


        element.textContent =
          value + suffix;


        if (progress < 1) {

          requestAnimationFrame(
            updateNumber
          );

        } else {

          element.textContent =
            target + suffix;

        }

      }


      requestAnimationFrame(
        updateNumber
      );

    }


    if ('IntersectionObserver' in window) {

      let statsObserver;


      statsObserver =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                animateNumber(
                  entry.target
                );


                statsObserver.unobserve(
                  entry.target
                );

              }

            });

          },
          {
            threshold: 0.5
          }
        );


      statNumbers.forEach(function (stat) {

        statsObserver.observe(stat);

      });

    } else {

      statNumbers.forEach(function (stat) {

        animateNumber(stat);

      });

    }

  }


  /* =========================================
     MODO PRESENTACIÓN
     ========================================= */

  const presentationToggle =
    document.getElementById(
      'presentation-toggle'
    );


  const presentationOverlay =
    document.getElementById(
      'presentation-overlay'
    );


  const presentationClose =
    document.getElementById(
      'presentation-close'
    );


  const slideYear =
    document.getElementById(
      'slide-year'
    );


  const slideTitle =
    document.getElementById(
      'slide-title'
    );


  const slideSummary =
    document.getElementById(
      'slide-summary'
    );


  const slideDetail =
    document.getElementById(
      'slide-detail'
    );


  const slidePrev =
    document.getElementById(
      'slide-prev'
    );


  const slideNext =
    document.getElementById(
      'slide-next'
    );


  const slideAutoplay =
    document.getElementById(
      'slide-autoplay'
    );


  const presentationDots =
    document.getElementById(
      'presentation-dots'
    );


  const presentationCounter =
    document.getElementById(
      'presentation-counter'
    );


  const presentationSlide =
    document.querySelector(
      '.presentation-slide'
    );


  /* =========================================
     DATOS DE LA PRESENTACIÓN
     ========================================= */

  const timelineData = [];


  timelineItems.forEach(function (item) {

    const yearElement =
      item.querySelector(
        '.timeline-year'
      );


    const titleElement =
      item.querySelector('h3');


    const summaryElement =
      item.querySelector(
        '.timeline-summary'
      );


    const detailElement =
      item.querySelector(
        '.timeline-detail'
      );


    let year = '';


    if (item.dataset.year) {

      year = item.dataset.year;

    } else if (yearElement) {

      year =
        yearElement.textContent.trim();

    }


    const title =
      titleElement
        ? titleElement.textContent.trim()
        : '';


    const summary =
      summaryElement
        ? summaryElement.textContent.trim()
        : '';


    const detail =
      detailElement
        ? detailElement.textContent.trim()
        : '';


    timelineData.push({

      year: year,

      title: title,

      summary: summary,

      detail: detail

    });

  });


  let currentSlide = 0;

  let autoplayInterval = null;


  /* =========================================
     CREAR PUNTOS DE PRESENTACIÓN
     ========================================= */

  function buildPresentationDots() {

    if (!presentationDots) {

      return;

    }


    presentationDots.innerHTML = '';


    timelineData.forEach(
      function (_, index) {

        const dot =
          document.createElement(
            'button'
          );


        dot.type = 'button';


        dot.setAttribute(
          'aria-label',
          'Ir a la diapositiva ' +
          (index + 1)
        );


        dot.addEventListener(
          'click',
          function () {

            showSlide(index);

          }
        );


        presentationDots.appendChild(
          dot
        );

      }
    );

  }


  /* =========================================
     MOSTRAR DIAPOSITIVA
     ========================================= */

  function showSlide(index) {

    if (!timelineData.length) {

      return;

    }


    if (index < 0) {

      index =
        timelineData.length - 1;

    }


    if (
      index >=
      timelineData.length
    ) {

      index = 0;

    }


    currentSlide = index;


    const slide =
      timelineData[currentSlide];


    if (presentationSlide) {

      presentationSlide.classList.remove(
        'visible'
      );

    }


    setTimeout(function () {

      if (slideYear) {

        slideYear.textContent =
          slide.year;

      }


      if (slideTitle) {

        slideTitle.textContent =
          slide.title;

      }


      if (slideSummary) {

        slideSummary.textContent =
          slide.summary;

      }


      if (slideDetail) {

        slideDetail.textContent =
          slide.detail;

      }


      if (presentationCounter) {

        presentationCounter.textContent =
          (
            currentSlide + 1
          ) +
          ' / ' +
          timelineData.length;

      }


      if (presentationDots) {

        const dots =
          presentationDots.querySelectorAll(
            'button'
          );


        dots.forEach(
          function (dot, dotIndex) {

            dot.classList.toggle(
              'active',
              dotIndex === currentSlide
            );

          }
        );

      }


      if (presentationSlide) {

        requestAnimationFrame(
          function () {

            presentationSlide.classList.add(
              'visible'
            );

          }
        );

      }

    }, 180);

  }


  /* =========================================
     ABRIR PRESENTACIÓN
     ========================================= */

  function openPresentation() {

    if (!presentationOverlay) {

      return;

    }


    buildPresentationDots();

    showSlide(0);


    presentationOverlay.classList.add(
      'open'
    );


    body.style.overflow = 'hidden';


    if (presentationToggle) {

      presentationToggle.setAttribute(
        'aria-expanded',
        'true'
      );

    }

  }


  /* =========================================
     CERRAR PRESENTACIÓN
     ========================================= */

  function closePresentation() {

    if (!presentationOverlay) {

      return;

    }


    stopAutoplay();


    presentationOverlay.classList.remove(
      'open'
    );


    body.style.overflow = '';


    if (presentationToggle) {

      presentationToggle.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  }


  /* =========================================
     SIGUIENTE / ANTERIOR
     ========================================= */

  function nextSlide() {

    showSlide(
      currentSlide + 1
    );

  }


  function previousSlide() {

    showSlide(
      currentSlide - 1
    );

  }


  /* =========================================
     AUTOPLAY
     ========================================= */

  function startAutoplay() {

    if (autoplayInterval) {

      return;

    }


    autoplayInterval =
      setInterval(
        function () {

          nextSlide();

        },
        5000
      );


    if (slideAutoplay) {

      slideAutoplay.classList.add(
        'is-playing'
      );


      slideAutoplay.textContent =
        '❚❚';


      slideAutoplay.setAttribute(
        'aria-label',
        'Pausar avance automático'
      );

    }

  }


  function stopAutoplay() {

    if (autoplayInterval) {

      clearInterval(
        autoplayInterval
      );


      autoplayInterval = null;

    }


    if (slideAutoplay) {

      slideAutoplay.classList.remove(
        'is-playing'
      );


      slideAutoplay.textContent =
        '▶';


      slideAutoplay.setAttribute(
        'aria-label',
        'Avance automático'
      );

    }

  }


  function toggleAutoplay() {

    if (autoplayInterval) {

      stopAutoplay();

    } else {

      startAutoplay();

    }

  }


  /* =========================================
     EVENTOS DE PRESENTACIÓN
     ========================================= */

  if (presentationToggle) {

    presentationToggle.addEventListener(
      'click',
      openPresentation
    );

  }


  if (presentationClose) {

    presentationClose.addEventListener(
      'click',
      closePresentation
    );

  }


  if (slideNext) {

    slideNext.addEventListener(
      'click',
      nextSlide
    );

  }


  if (slidePrev) {

    slidePrev.addEventListener(
      'click',
      previousSlide
    );

  }


  if (slideAutoplay) {

    slideAutoplay.addEventListener(
      'click',
      toggleAutoplay
    );

  }


  /* =========================================
     TECLADO PARA PRESENTACIÓN
     ========================================= */

  document.addEventListener(
    'keydown',
    function (event) {

      if (
        !presentationOverlay ||
        !presentationOverlay.classList.contains(
          'open'
        )
      ) {

        return;

      }


      switch (event.key) {

        case 'ArrowRight':

        case 'ArrowDown':

          nextSlide();

          break;


        case 'ArrowLeft':

        case 'ArrowUp':

          previousSlide();

          break;


        case 'Escape':

          closePresentation();

          break;


        case ' ':

          event.preventDefault();

          toggleAutoplay();

          break;

      }

    }
  );


  /* =========================================
     CERRAR AL HACER CLICK FUERA
     ========================================= */

  if (presentationOverlay) {

    presentationOverlay.addEventListener(
      'click',
      function (event) {

        if (
          event.target ===
          presentationOverlay
        ) {

          closePresentation();

        }

      }
    );

  }


  /* =========================================
     INICIO
     ========================================= */

  console.log(
    '%c EVOLVE ',
    'font-size: 20px; font-weight: bold; color: #FF2E9A;'
  );


  console.log(
    'Sistema EVOLVE iniciado correctamente.'
  );

});