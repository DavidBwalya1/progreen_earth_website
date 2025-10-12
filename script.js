// Mobile Navigation Toggle with Backdrop
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Create backdrop element
let menuBackdrop = document.querySelector('.menu-backdrop');
if (!menuBackdrop) {
    menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);
}

if (hamburger && navLinks) {
    function toggleMenu() {
        const isActive = navLinks.classList.contains('active');
        
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (!isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[1].style.transform = 'translateX(-20px)';
            spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
        }
    }
    
    function closeMenu() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[1].style.transform = 'none';
        spans[2].style.transform = 'none';
    }
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking backdrop
    menuBackdrop.addEventListener('click', closeMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .impact-card, .activity-card, .team-card, .outcome-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            const values = [1200000, 3300000, 34000000];
            statNumbers.forEach((stat, index) => {
                animateCounter(stat, values[index]);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
