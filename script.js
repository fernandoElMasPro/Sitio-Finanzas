
// ============================================
// EVOLVE — JavaScript principal
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // Tema claro / oscuro
  // ============================================

  const themeToggle =
    document.getElementById("theme-toggle") ||
    document.getElementById("themeToggle");

  const themeIcon =
    document.getElementById("theme-icon") ||
    themeToggle?.querySelector("i");

  const root = document.documentElement;

  const savedTheme =
    localStorage.getItem("evolve-theme");

  let activeAccentRGB = "0, 245, 255";


  // Leer color cyan desde CSS
  function readAccentRGB() {

    const value =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-cyan-rgb")
        .trim();

    if (value) {
      activeAccentRGB = value;
    }

  }


  // Aplicar tema
  function applyTheme(theme) {

    if (theme === "light") {

      root.setAttribute(
        "data-theme",
        "light"
      );

      if (themeIcon) {

        if (
          themeIcon.tagName === "I"
        ) {

          themeIcon.className =
            "bi bi-sun-fill";

        } else {

          themeIcon.textContent = "☀";

        }

      }

    } else {

      root.removeAttribute(
        "data-theme"
      );

      if (themeIcon) {

        if (
          themeIcon.tagName === "I"
        ) {

          themeIcon.className =
            "bi bi-moon-stars";

        } else {

          themeIcon.textContent = "☾";

        }

      }

    }

    readAccentRGB();
  }


  // Cargar tema guardado
  if (savedTheme) {

    applyTheme(savedTheme);

  } else {

    readAccentRGB();

  }


  // Botón tema
  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const isLight =
          root.getAttribute(
            "data-theme"
          ) === "light";

        const nextTheme =
          isLight ? "dark" : "light";

        applyTheme(nextTheme);

        localStorage.setItem(
          "evolve-theme",
          nextTheme
        );

      }
    );

  }


  // ============================================
  // Typewriter principal
  // ============================================

  const typewriterEl =
    document.getElementById(
      "typewriter-text"
    );


  if (typewriterEl) {

    const fullText =
      "PULGARCITO DE AMÉRICA EN LA ERA DIGITAL";

    let index = 0;


    function typeChar() {

      if (index <= fullText.length) {

        typewriterEl.textContent =
          fullText.slice(0, index);

        index++;

        setTimeout(
          typeChar,
          45
        );

      }

    }


    typeChar();

  }


  // ============================================
  // Typewriter — Nosotros
  // ============================================

  const nosotrosTypewriterEl =
    document.getElementById(
      "nosotros-typewriter"
    );


  if (nosotrosTypewriterEl) {

    const fullTextNosotros =
      '"Tecnologia y educacion transformando a El salvador"';

    let nosotrosIndex = 0;


    function typeNosotros() {

      if (
        nosotrosIndex <=
        fullTextNosotros.length
      ) {

        nosotrosTypewriterEl.textContent =
          fullTextNosotros.slice(
            0,
            nosotrosIndex
          );

        nosotrosIndex++;

        setTimeout(
          typeNosotros,
          45
        );

      }

    }


    typeNosotros();

  }


  // ============================================
  // Barra de progreso
  // ============================================

  const scrollProgress =
    document.getElementById(
      "scroll-progress"
    );


  function updateScrollProgress() {

    const scrollTop =
      window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percent =
      docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;


    if (scrollProgress) {

      scrollProgress.style.width =
        `${percent}%`;

    }

  }


  window.addEventListener(
    "scroll",
    updateScrollProgress
  );

  updateScrollProgress();


  // ============================================
  // Menú
  // ============================================

  const menuToggle =
    document.getElementById(
      "menu-toggle"
    );

  const mainNav =
    document.getElementById(
      "main-nav"
    );


  if (menuToggle && mainNav) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mainNav.classList.toggle(
            "open"
          );

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    // Cerrar menú al pulsar un enlace
    mainNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            mainNav.classList.remove(
              "open"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });


    // Escape cierra menú
    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          mainNav.classList.contains(
            "open"
          )
        ) {

          mainNav.classList.remove(
            "open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  }


  // ============================================
  // Línea de tiempo
  // ============================================

  const timelineCards =
    document.querySelectorAll(
      ".timeline-card"
    );


  timelineCards.forEach(
    (card) => {

      card.addEventListener(
        "click",
        () => {

          const item =
            card.closest(
              ".timeline-item"
            );

          if (item) {

            item.classList.toggle(
              "expanded"
            );

          }

        }
      );

    }
  );


  // ============================================
  // Revelado de timeline
  // ============================================

  const timelineItems =
    document.querySelectorAll(
      ".timeline-item"
    );


  if (
    "IntersectionObserver" in window &&
    timelineItems.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "in-view"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.2
        }
      );


    timelineItems.forEach(
      (item) => {

        revealObserver.observe(item);

      }
    );

  } else {

    timelineItems.forEach(
      (item) => {

        item.classList.add(
          "in-view"
        );

      }
    );

  }


  // ============================================
  // Contadores
  // ============================================

  const statNumbers =
    document.querySelectorAll(
      ".stat-number"
    );


  function animateCount(element) {

    const target =
      parseFloat(
        element.dataset.target
      );


    if (!Number.isFinite(target)) {
      return;
    }


    const suffix =
      element.dataset.suffix || "";

    const duration = 1400;

    const start =
      performance.now();


    function step(now) {

      const progress =
        Math.min(
          (now - start) /
          duration,
          1
        );


      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const current =
        Math.round(
          target * eased
        );


      element.textContent =
        current + suffix;


      if (progress < 1) {

        requestAnimationFrame(
          step
        );

      }

    }


    requestAnimationFrame(
      step
    );

  }


  if (
    "IntersectionObserver" in window &&
    statNumbers.length
  ) {

    const statObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                animateCount(
                  entry.target
                );

                statObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.5
        }
      );


    statNumbers.forEach(
      (element) => {

        statObserver.observe(
          element
        );

      }
    );

  }


  // ============================================
  // Partículas
  // ============================================

  const canvas =
    document.getElementById(
      "particle-canvas"
    );


  if (canvas) {

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }


    let particles = [];

    let width = 0;

    let height = 0;


    function resizeCanvas() {

      width =
        window.innerWidth;

      height =
        window.innerHeight;


      canvas.width =
        width;

      canvas.height =
        height;

    }


    function createParticles() {

      const count =
        Math.min(
          70,
          Math.floor(
            (width * height) /
            18000
          )
        );


      particles =
        Array.from(
          {
            length: count
          },
          () => ({

            x:
              Math.random() *
              width,

            y:
              Math.random() *
              height,

            vx:
              (Math.random() - 0.5) *
              0.3,

            vy:
              (Math.random() - 0.5) *
              0.3

          })
        );

    }


    function drawParticles() {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      particles.forEach(
        (particle) => {

          particle.x +=
            particle.vx;

          particle.y +=
            particle.vy;


          if (
            particle.x < 0 ||
            particle.x > width
          ) {

            particle.vx *= -1;

          }


          if (
            particle.y < 0 ||
            particle.y > height
          ) {

            particle.vy *= -1;

          }

        }
      );


      // Líneas entre partículas
      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {

          const a =
            particles[i];

          const b =
            particles[j];


          const distance =
            Math.hypot(
              a.x - b.x,
              a.y - b.y
            );


          if (distance < 140) {

            const opacity =
              0.12 *
              (
                1 -
                distance / 140
              );


            ctx.strokeStyle =
              `rgba(
                ${activeAccentRGB},
                ${opacity}
              )`;

            ctx.lineWidth = 1;

            ctx.beginPath();

            ctx.moveTo(
              a.x,
              a.y
            );

            ctx.lineTo(
              b.x,
              b.y
            );

            ctx.stroke();

          }

        }

      }


      // Puntos
      particles.forEach(
        (particle) => {

          ctx.fillStyle =
            `rgba(
              ${activeAccentRGB},
              0.6
            )`;

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            1.6,
            0,
            Math.PI * 2
          );

          ctx.fill();

        }
      );


      requestAnimationFrame(
        drawParticles
      );

    }


    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    resizeCanvas();

    createParticles();


    window.addEventListener(
      "resize",
      () => {

        resizeCanvas();

        createParticles();

      }
    );


    if (!prefersReducedMotion) {

      drawParticles();

    }

  }


  // ============================================
  // Modo presentación
  // ============================================

  const presentationToggle =
    document.getElementById(
      "presentation-toggle"
    );

  const presentationOverlay =
    document.getElementById(
      "presentation-overlay"
    );

  const presentationClose =
    document.getElementById(
      "presentation-close"
    );

  const slideEl =
    document.querySelector(
      ".presentation-slide"
    );

  const slideYear =
    document.getElementById(
      "slide-year"
    );

  const slideTitle =
    document.getElementById(
      "slide-title"
    );

  const slideSummary =
    document.getElementById(
      "slide-summary"
    );

  const slideDetail =
    document.getElementById(
      "slide-detail"
    );

  const slidePrev =
    document.getElementById(
      "slide-prev"
    );

  const slideNext =
    document.getElementById(
      "slide-next"
    );

  const slideAutoplay =
    document.getElementById(
      "slide-autoplay"
    );

  const dotsContainer =
    document.getElementById(
      "presentation-dots"
    );

  const presentationCounter =
    document.getElementById(
      "presentation-counter"
    );


  if (
    presentationToggle &&
    timelineItems.length &&
    presentationOverlay &&
    slideEl &&
    slideYear &&
    slideTitle &&
    slideSummary &&
    slideDetail &&
    slidePrev &&
    slideNext &&
    slideAutoplay &&
    dotsContainer &&
    presentationCounter
  ) {

    const slides =
      Array.from(
        timelineItems
      )
      .map(
        (item) => {

          return {

            year:
              item.querySelector(
                ".timeline-year"
              )?.textContent.trim() || "",

            title:
              item.querySelector(
                "h3"
              )?.textContent.trim() || "",

            summary:
              item.querySelector(
                ".timeline-summary"
              )?.textContent.trim() || "",

            detail:
              item.querySelector(
                ".timeline-detail"
              )?.textContent.trim() || ""

          };

        }
      );


    let currentSlide = 0;

    let autoplayTimer = null;


    // Crear puntos
    slides.forEach(
      (_, index) => {

        const dot =
          document.createElement(
            "button"
          );

        dot.type = "button";

        dot.setAttribute(
          "aria-label",
          `Ir a la diapositiva ${
            index + 1
          }`
        );


        dot.addEventListener(
          "click",
          () => {

            stopAutoplay();

            showSlide(index);

          }
        );


        dotsContainer.appendChild(
          dot
        );

      }
    );


    // Renderizar diapositiva
    function renderSlide(index) {

      const slide =
        slides[index];


      if (!slide) {
        return;
      }


      slideYear.textContent =
        slide.year;

      slideTitle.textContent =
        slide.title;

      slideSummary.textContent =
        slide.summary;

      slideDetail.textContent =
        slide.detail;


      presentationCounter.textContent =
        `${index + 1} / ${slides.length}`;


      dotsContainer
        .querySelectorAll("button")
        .forEach(
          (dot, dotIndex) => {

            dot.classList.toggle(
              "active",
              dotIndex === index
            );

          }
        );

    }


    // Cambiar diapositiva
    function showSlide(index) {

      currentSlide =
        (
          index +
          slides.length
        ) %
        slides.length;


      slideEl.classList.remove(
        "visible"
      );


      setTimeout(
        () => {

          renderSlide(
            currentSlide
          );

          slideEl.classList.add(
            "visible"
          );

        },
        150
      );

    }


    // Detener autoplay
    function stopAutoplay() {

      if (autoplayTimer) {

        clearInterval(
          autoplayTimer
        );

        autoplayTimer = null;

      }


      slideAutoplay.classList.remove(
        "is-playing"
      );


      slideAutoplay.textContent =
        "▶";

    }


    // Iniciar autoplay
    function startAutoplay() {

      stopAutoplay();


      slideAutoplay.classList.add(
        "is-playing"
      );


      slideAutoplay.textContent =
        "❚❚";


      autoplayTimer =
        setInterval(
          () => {

            showSlide(
              currentSlide + 1
            );

          },
          4000
        );

    }


    // Abrir presentación
    function openPresentation() {

      presentationOverlay.classList.add(
        "open"
      );


      document.body.style.overflow =
        "hidden";


      currentSlide = 0;


      renderSlide(
        currentSlide
      );


      requestAnimationFrame(
        () => {

          slideEl.classList.add(
            "visible"
          );

        }
      );

    }


    // Cerrar presentación
    function closePresentation() {

      presentationOverlay.classList.remove(
        "open"
      );


      document.body.style.overflow =
        "";


      slideEl.classList.remove(
        "visible"
      );


      stopAutoplay();

    }


    presentationToggle.addEventListener(
      "click",
      openPresentation
    );


    presentationClose.addEventListener(
      "click",
      closePresentation
    );


    slidePrev.addEventListener(
      "click",
      () => {

        stopAutoplay();

        showSlide(
          currentSlide - 1
        );

      }
    );


    slideNext.addEventListener(
      "click",
      () => {

        stopAutoplay();

        showSlide(
          currentSlide + 1
        );

      }
    );


    slideAutoplay.addEventListener(
      "click",
      () => {

        if (autoplayTimer) {

          stopAutoplay();

        } else {

          startAutoplay();

        }

      }
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          !presentationOverlay.classList.contains(
            "open"
          )
        ) {

          return;

        }


        if (
          event.key === "Escape"
        ) {

          closePresentation();

        }


        if (
          event.key === "ArrowRight"
        ) {

          stopAutoplay();

          showSlide(
            currentSlide + 1
          );

        }


        if (
          event.key === "ArrowLeft"
        ) {

          stopAutoplay();

          showSlide(
            currentSlide - 1
          );

        }

      }
    );

  }


  // ============================================
  // Rastro del cursor
  // ============================================

  const cursorCanvas =
    document.getElementById(
      "cursor-trail-canvas"
    );


  if (cursorCanvas) {

    const cctx =
      cursorCanvas.getContext("2d");


    if (cctx) {

      let trailPoints = [];


      const prefersReducedMotionCursor =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;


      const isTouchDevice =
        window.matchMedia(
          "(pointer: coarse)"
        ).matches;


      function resizeCursorCanvas() {

        cursorCanvas.width =
          window.innerWidth;

        cursorCanvas.height =
          window.innerHeight;

      }


      resizeCursorCanvas();


      window.addEventListener(
        "resize",
        resizeCursorCanvas
      );


      if (
        !prefersReducedMotionCursor &&
        !isTouchDevice
      ) {

        window.addEventListener(
          "mousemove",
          (event) => {

            trailPoints.push({

              x: event.clientX,

              y: event.clientY,

              life: 1

            });


            if (
              trailPoints.length > 24
            ) {

              trailPoints.shift();

            }

          }
        );


        function drawTrail() {

          cctx.clearRect(
            0,
            0,
            cursorCanvas.width,
            cursorCanvas.height
          );


          trailPoints.forEach(
            (point) => {

              point.life -= 0.045;

            }
          );


          trailPoints =
            trailPoints.filter(
              (point) =>
                point.life > 0
            );


          trailPoints.forEach(
            (point) => {

              const radius =
                5 * point.life;


              const gradient =
                cctx.createRadialGradient(
                  point.x,
                  point.y,
                  0,
                  point.x,
                  point.y,
                  radius * 3
                );


              gradient.addColorStop(
                0,
                `rgba(
                  ${activeAccentRGB},
                  ${0.5 * point.life}
                )`
              );


              gradient.addColorStop(
                1,
                `rgba(
                  ${activeAccentRGB},
                  0
                )`
              );


              cctx.fillStyle =
                gradient;


              cctx.beginPath();


              cctx.arc(
                point.x,
                point.y,
                radius * 3,
                0,
                Math.PI * 2
              );


              cctx.fill();

            }
          );


          requestAnimationFrame(
            drawTrail
          );

        }


        drawTrail();

      }

    }

  }


  // ============================================
  // Inicialización final
  // ============================================

  readAccentRGB();

});

