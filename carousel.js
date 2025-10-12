// Carousel functionality with mobile optimization
let currentSlideIndex = 0;
let autoSlideInterval;
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    // Wrap around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Hide all slides with smooth transition
    slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === currentSlideIndex) {
            slide.style.zIndex = '2';
        } else {
            slide.style.zIndex = '1';
        }
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    slides[currentSlideIndex].classList.add('active');
    
    // Highlight current dot
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function moveSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide();
}

function currentSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveSlide(-1);
        } else if (e.key === 'ArrowRight') {
            moveSlide(1);
        }
    });
    
    // Enhanced touch/swipe support for mobile
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            // Prevent default only for horizontal swipes
            const touchCurrentX = e.changedTouches[0].screenX;
            const touchCurrentY = e.changedTouches[0].screenY;
            const diffX = Math.abs(touchCurrentX - touchStartX);
            const diffY = Math.abs(touchCurrentY - touchStartY);
            
            if (diffX > diffY) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > diffY) {
            if (diffX > 50) {
                moveSlide(1); // Swipe left
            } else if (diffX < -50) {
                moveSlide(-1); // Swipe right
            }
        }
    }
});
