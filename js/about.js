document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation
    const elements = document.querySelectorAll('header, section, footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    // Nav bar toggle
    const toggleButton = document.querySelector('.nav-toggle');
    const header = document.querySelector('header');

    toggleButton.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });
});