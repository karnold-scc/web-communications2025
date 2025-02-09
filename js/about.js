setInterval(() => {
    let elfsightBranding = document.querySelector('[href*="https://elfsight.com"]');
    if (elfsightBranding) {
        elfsightBranding.style.display = "none";
        elfsightBranding.remove()
    }
}, 500); // Wait 3 seconds to ensure the widget has loaded
