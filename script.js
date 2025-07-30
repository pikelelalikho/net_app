document.addEventListener('DOMContentLoaded', function () {
    // ===== THROTTLE FUNCTION =====
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    // ===== NAVIGATION MENU TOGGLE =====
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    const toggleMenu = () => {
        if (!menu) return;
        menu.classList.toggle("show");
        if (menuToggle) {
            const expanded = menu.classList.contains("show");
            menuToggle.setAttribute('aria-expanded', expanded);
        }
    };

    if (menuToggle && menu) {
        menuToggle.setAttribute('aria-controls', 'menu');
        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('keypress', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // ===== AUTO-HIDE MENU NEAR PAGE BOTTOM =====
    window.addEventListener("scroll", throttle(() => {
        if (!menu) return;

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        if (distanceFromBottom < 100) {
            menu.classList.remove("show");
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }, 200));

    // ===== PROFILE IMAGE ZOOM =====
    const profileImg = document.getElementById('profileImg');
    const zoomOverlay = document.getElementById('imageZoomOverlay');
    const zoomedImage = document.getElementById('zoomedImage');

    if (profileImg && zoomOverlay && zoomedImage) {
        profileImg.addEventListener('click', () => {
            zoomedImage.src = profileImg.src;
            zoomOverlay.style.display = 'flex';
            zoomOverlay.setAttribute('tabindex', '-1');
            zoomOverlay.focus();
        });

        zoomOverlay.addEventListener('click', () => {
            zoomOverlay.style.display = 'none';
        });

        // Close zoom overlay on Escape key
        zoomOverlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                zoomOverlay.style.display = 'none';
            }
        });
    }

    // ===== ACTIVE LINK HIGHLIGHT ON SCROLL =====
    const sections = document.querySelectorAll('section, .section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', throttle(() => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
        });
    }, 100));

    // ===== SCROLL REVEAL ANIMATION =====
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // ===== IMAGE MODAL FUNCTIONALITY =====
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalImg = document.getElementById("modalImg");
    const imgModal = document.getElementById("imgModal");

    if (modalOverlay && modalImg && imgModal) {
        document.querySelectorAll(".images img").forEach(img => {
            img.addEventListener("click", () => {
                showModal(img.src);
            });
        });

        window.showModal = function (imgSrc) {
            modalImg.src = imgSrc;
            imgModal.style.display = "block";
            modalOverlay.style.display = "block";
            modalOverlay.setAttribute('tabindex', '-1');
            modalOverlay.focus();
        };

        window.closeModal = function () {
            imgModal.style.display = "none";
            modalOverlay.style.display = "none";
        };

        // Close modal on clicking overlay
        modalOverlay.addEventListener('click', closeModal);

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imgModal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // ===== NAVBAR FADE ON SCROLL DIRECTION =====
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    if (navbar) {
        navbar.classList.add('navbar-visible');

        window.addEventListener('scroll', throttle(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 100) {
                navbar.classList.add('navbar-hidden');
                navbar.classList.remove('navbar-visible');
            } else {
                navbar.classList.add('navbar-visible');
                navbar.classList.remove('navbar-hidden');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, 100));
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.navbar-container');

  if (!header) return;

  // Initially hidden and shifted right
  header.style.opacity = 0;
  header.style.transform = 'translateX(20px)';
  header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

  function onScroll() {
    if (window.scrollX > 50) { // Adjust threshold as needed
      header.style.opacity = 1;
      header.style.transform = 'translateX(0)';
    } else {
      header.style.opacity = 0;
      header.style.transform = 'translateX(20px)';
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // trigger on load
});
