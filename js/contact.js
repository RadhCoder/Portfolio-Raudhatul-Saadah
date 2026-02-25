// =============================================
//   CONTACT PAGE JS
// =============================================

function setSubject(text) {
    const subjectInput = document.getElementById('subject');
    if (subjectInput) {
        subjectInput.value = text;
        subjectInput.focus();
    }
    // Update chip active states
    document.querySelectorAll('.chip').forEach(c => {
        c.classList.toggle('active', c.textContent.trim().includes(text));
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');
    const form = document.getElementById('contactForm');

    btn.querySelector('.btn-text').style.display = 'none';
    btn.querySelector('.btn-loading').style.display = 'inline';
    btn.disabled = true;

    // Simulate send (replace with actual backend/emailjs call)
    setTimeout(() => {
        btn.style.display = 'none';
        success.style.display = 'flex';
        form.reset();

        setTimeout(() => {
            btn.style.display = '';
            btn.querySelector('.btn-text').style.display = 'inline';
            btn.querySelector('.btn-loading').style.display = 'none';
            btn.disabled = false;
            success.style.display = 'none';
        }, 5000);
    }, 1500);
}