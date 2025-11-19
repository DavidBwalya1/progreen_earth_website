document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    // Toggle menu function
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded attribute
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle active class on hamburger
        hamburger.classList.toggle('active');
        
        // Toggle body scroll
        body.classList.toggle('menu-open');
        
        // Toggle nav links visibility
        if (!isExpanded) {
            navLinks.style.transform = 'translateX(0)';
        } else {
            navLinks.style.transform = 'translateX(100%)';
        }
    }
    
    // Add click event to hamburger
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when window is resized above breakpoint
    function handleResize() {
        if (window.innerWidth > 992) {
            // Reset styles when resizing to desktop
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            navLinks.removeAttribute('style');
        }
    }
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
});
