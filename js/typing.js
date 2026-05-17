/* ==========================================================================
   TYPING.JS — One-time typewriter for hero tagline, fade-in for about
   ========================================================================== */

(function () {
  'use strict';

  // ===== HERO TAGLINE — one-time typing (no delete loop) =====
  const taglineEl = document.getElementById('heroTagline');
  if (taglineEl) {
    const words = ['Cybersecurity Engineer', 'Full-Stack Developer', 'Linux Infrastructure'];
    let wi = 0;
    let ci = 0;
    let isDeleting = false;
    let delay = 100;

    function typeWord() {
      const word = words[wi];
      taglineEl.textContent = isDeleting
        ? word.substring(0, ci--)
        : word.substring(0, ci++);

      if (!isDeleting && ci > word.length) {
        // Pause at end
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && ci < 0) {
        isDeleting = false;
        wi = (wi + 1) % words.length;
        ci = 0;
        delay = 500;
      } else {
        delay = isDeleting ? 55 : 95;
      }

      setTimeout(typeWord, delay);
    }
    // Start after hero fade-in
    setTimeout(typeWord, 600);
  }

  // ===== ABOUT PARAGRAPHS — staggered fade-in on scroll =====
  const aboutParagraphs = document.querySelectorAll('.about-text p');
  if (aboutParagraphs.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('para-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    aboutParagraphs.forEach((p, i) => {
      p.style.opacity = '0';
      p.style.transform = 'translateY(12px)';
      p.style.transition = `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`;
      p.classList.add('about-para');
      io.observe(p);
    });

    // Inject visible state via CSS
    const style = document.createElement('style');
    style.textContent = `.para-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
  }

})();
