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

    // ===== MENU TOGGLE =====
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        const toggleMenu = () => {
            menu.classList.toggle("show");
            menuToggle.setAttribute('aria-expanded', menu.classList.contains("show"));
        };

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

    // ===== AUTO-CLOSE MENU NEAR PAGE BOTTOM =====
    window.addEventListener("scroll", throttle(() => {
        if (!menu) return;
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        if (distanceFromBottom < 100) {
            menu.classList.remove("show");
            menuToggle?.setAttribute('aria-expanded', 'false');
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

    // ===== SCROLL REVEAL =====
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

        modalOverlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imgModal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // ===== FADE HEADER BASED ON SCROLL DIRECTION =====
    const header = document.querySelector('.navbar-container');
    let lastScrollY = window.scrollY;

    if (header) {
        header.style.transition = 'opacity 0.4s ease';

        window.addEventListener('scroll', throttle(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down
                header.style.opacity = '0.2';
            } else {
                // Scrolling up
                header.style.opacity = '1';
            }

            lastScrollY = currentScrollY;
        }, 100));
    }
});

header.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

if (currentScrollY > lastScrollY && currentScrollY > 50) {
    header.style.opacity = '0.2';
    header.style.transform = 'translateY(-10px)';
} else {
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
}

