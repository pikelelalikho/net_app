document.addEventListener('DOMContentLoaded', function () {
    // ===== NAVIGATION MENU TOGGLE =====
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    const toggleMenu = () => {
        menu.classList.toggle("show");
    };

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('keypress', e => {
            if (e.key === 'Enter') toggleMenu();
        });
    }

    // ===== AUTO-HIDE MENU NEAR PAGE BOTTOM =====
    window.addEventListener("scroll", throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        if (distanceFromBottom < 100 && menu) {
            menu.classList.remove("show");
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
        });

        zoomOverlay.addEventListener('click', () => {
            zoomOverlay.style.display = 'none';
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
    document.querySelectorAll(".images img").forEach(img => {
        img.addEventListener("click", () => {
            showModal(img.src);
        });
    });

    const modalOverlay = document.querySelector(".modal-overlay");
    const modalImg = document.getElementById("modalImg");
    const imgModal = document.getElementById("imgModal");

    window.showModal = function (imgSrc) {
        if (modalImg && imgModal && modalOverlay) {
            modalImg.src = imgSrc;
            imgModal.style.display = "block";
            modalOverlay.style.display = "block";
        }
    };

    window.closeModal = function () {
        if (imgModal && modalOverlay) {
            imgModal.style.display = "none";
            modalOverlay.style.display = "none";
        }
    };

    // ===== HIDE/SHOW NAVBAR ON SCROLL DIRECTION =====
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            if (currentScroll > lastScrollTop) {
                navbar.classList.add('navbar-hidden');
                navbar.classList.remove('navbar-visible');
            } else {
                navbar.classList.add('navbar-visible');
                navbar.classList.remove('navbar-hidden');
            }
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

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
});
