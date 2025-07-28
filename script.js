document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVIGATION MENU TOGGLE =====
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    const toggleMenu = () => {
        menu.classList.toggle("show");
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') toggleMenu();
    });

    // ===== AUTO-HIDE MENU NEAR PAGE BOTTOM =====
    window.addEventListener("scroll", throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        if (distanceFromBottom < 100) {
            menu.classList.remove("show");
        }
    }, 200));

    // ===== PROFILE IMAGE ZOOM =====
    const profileImg = document.getElementById('profileImg');
    const zoomOverlay = document.getElementById('imageZoomOverlay');
    const zoomedImage = document.getElementById('zoomedImage');

    if (profileImg && zoomOverlay && zoomedImage) {
        profileImg.addEventListener('click', function () {
            zoomedImage.src = this.src;
            zoomOverlay.style.display = 'flex';
        });
    }

    // ===== ACTIVE LINK HIGHLIGHT ON SCROLL =====
    const sections = document.querySelectorAll('section, .section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', throttle(() => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Adjust for navbar height
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

    // ===== THROTTLE HELPER FUNCTION =====
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
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

});

function showModal(imgSrc) {
            document.getElementById("modalImg").src = imgSrc;
            document.getElementById("imgModal").style.display = "block";
            document.querySelector(".modal-overlay").style.display = "block";
        }

        function closeModal() {
            document.getElementById("imgModal").style.display = "none";
            document.querySelector(".modal-overlay").style.display = "none";
        }

        document.querySelectorAll(".images img").forEach(img => {
            img.addEventListener("click", () => showModal(img.src));
        });
