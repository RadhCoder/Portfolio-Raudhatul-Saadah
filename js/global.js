// =============================================
//   GLOBAL JS — shared across all pages
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- TOUCH DEVICE CHECK ----
    var isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice) {
        var s = document.createElement('style');
        s.textContent = '*, *::before, *::after { cursor: auto !important; }';
        document.head.appendChild(s);
    }

    // ---- CUSTOM CURSOR (desktop only) ----
    var cursor = document.querySelector('.cursor');
    var ring = document.querySelector('.cursor-ring');

    if (!isTouchDevice && cursor && ring) {

        var CURSOR_OFFSET = 6; // half of 12px dot
        var RING_OFFSET = 19; // half of 38px ring

        var mx = window.innerWidth / 2;
        var my = window.innerHeight / 2;
        var rx = mx,
            ry = my;

        // ----- STEP 1: Track mouse position and ALWAYS show cursor on move -----
        // The cursor must be visible whenever the mouse is anywhere on the page.
        // We never hide it on mouseover/mouseout of elements — only when the
        // mouse truly exits the browser window (documentElement mouseleave).
        document.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;

            cursor.style.left = (mx - CURSOR_OFFSET) + 'px';
            cursor.style.top = (my - CURSOR_OFFSET) + 'px';

            // Make cursor visible the moment mouse enters the page
            cursor.classList.add('visible');
            ring.classList.add('visible');
        });

        // ----- STEP 2: Hide ONLY when mouse leaves the entire browser window -----
        document.documentElement.addEventListener('mouseleave', function () {
            cursor.classList.remove('visible');
            ring.classList.remove('visible');
        });

        document.documentElement.addEventListener('mouseenter', function () {
            cursor.classList.add('visible');
            ring.classList.add('visible');
        });

        // ----- STEP 3: Smooth-lag ring follows the dot -----
        function animateRing() {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            ring.style.left = (rx - RING_OFFSET) + 'px';
            ring.style.top = (ry - RING_OFFSET) + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // ----- STEP 4: Grow cursor on interactive elements via event delegation -----
        // mouseover fires when entering an element or any child.
        // We check if the target (or any ancestor) matches our selector.
        // On the ELSE branch (hovering plain body/section/div), we REMOVE hover
        // but the cursor stays VISIBLE — it never disappears.
        var HOVER_SELECTOR = [
            'a', 'button', 'input', 'textarea', 'select', 'label',
            '.skill-tag', '.tool-chip', '.tech-badge',
            '.project-card', '.filter-btn', '.chip',
            '.channel-card', '.ql-card', '.timeline-card',
            '.bio-card', '.deco-card', '.nav-logo',
            '.hamburger', '.btn'
        ].join(', ');

        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(HOVER_SELECTOR)) {
                cursor.classList.add('hover');
                ring.classList.add('hover');
            } else {
                // Plain area (body, section, div) — normal cursor size, still VISIBLE
                cursor.classList.remove('hover');
                ring.classList.remove('hover');
            }
        });

    } else if (cursor) {
        cursor.remove();
        if (ring) ring.remove();
    }

    // ---- SCROLL PROGRESS BAR ----
    var bar = document.querySelector('.progress-bar');
    if (bar) {
        window.addEventListener('scroll', function () {
            var total = document.documentElement.scrollHeight - window.innerHeight;
            var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
            bar.style.width = pct + '%';
        });
    }

    // ---- REVEAL ON SCROLL ----
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.08
        });
        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        reveals.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ---- HAMBURGER MENU ----
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    var mobileNavClose = document.getElementById('mobileNavClose');

    function openMobileNav() {
        if (hamburger) hamburger.classList.add('open');
        if (mobileNav) mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        if (hamburger) hamburger.classList.remove('open');
        if (mobileNav) mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openMobileNav);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeMobileNav);
        });
    }

    // ---- ACTIVE NAV LINKS ----
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (a) {
        var href = a.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(function (a) {
            if (a.getAttribute('href') === currentPage) {
                a.classList.add('active');
            }
        });
    }

});