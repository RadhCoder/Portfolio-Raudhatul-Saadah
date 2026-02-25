// =============================================
//   HOME PAGE JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // Animated counter for stats
    const statNums = document.querySelectorAll('.stat-num');
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                if (!target || isNaN(target)) return;
                let current = 0;
                const step = target / 40;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.childNodes[0].nodeValue = Math.ceil(current);
                }, 30);
                countObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.5
    });

    statNums.forEach(el => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) {
            el.dataset.target = val;
            countObserver.observe(el);
        }
    });

});