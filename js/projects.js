// =============================================
//   PROJECTS PAGE JS — Filter functionality
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sectionHeaders = document.querySelectorAll('.projects-section-header');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Show/hide project cards
            projectCards.forEach(card => {
                const categories = card.dataset.category || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show/hide section headers based on whether any cards in that section are visible
            if (filter === 'all') {
                // Always show both headers when showing all
                sectionHeaders.forEach(h => h.classList.remove('hidden'));
            } else {
                sectionHeaders.forEach(header => {
                    // Find all project cards between this header and the next header
                    let sibling = header.nextElementSibling;
                    let hasVisible = false;
                    while (sibling && !sibling.classList.contains('projects-section-header')) {
                        if (sibling.classList.contains('project-card') && !sibling.classList.contains('hidden')) {
                            hasVisible = true;
                            break;
                        }
                        sibling = sibling.nextElementSibling;
                    }
                    if (hasVisible) {
                        header.classList.remove('hidden');
                    } else {
                        header.classList.add('hidden');
                    }
                });
            }
        });
    });

});