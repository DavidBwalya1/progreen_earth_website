// Mobile Carousel Swipe and Dot Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        let currentSlide = 0;
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        // Touch event handlers
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd);
        
        // Mouse event handlers for desktop testing
        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mousemove', handleMouseMove);
        carousel.addEventListener('mouseup', handleMouseUp);
        carousel.addEventListener('mouseleave', handleMouseUp);
        
        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }
        
        function handleTouchMove(e) {
            if (!isDragging) return;
            endX = e.touches[0].clientX;
        }
        
        function handleTouchEnd() {
            if (!isDragging) return;
            isDragging = false;
            handleSwipe();
        }
        
        function handleMouseDown(e) {
            startX = e.clientX;
            isDragging = true;
            e.preventDefault();
        }
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            endX = e.clientX;
        }
        
        function handleMouseUp() {
            if (!isDragging) return;
            isDragging = false;
            handleSwipe();
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
                slide.classList.toggle('active', i === index);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
            
            // Call existing global function if it exists
            if (typeof window.currentSlide === 'function') {
                window.currentSlide(index);
            }
        }
        
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
            
            // Call existing global function if it exists
            if (typeof window.moveSlide === 'function') {
                window.moveSlide(1);
            }
        }
        
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
            
            // Call existing global function if it exists
            if (typeof window.moveSlide === 'function') {
                window.moveSlide(-1);
            }
        }
        
        // Dot click handlers - enhance existing onclick
        dots.forEach((dot, index) => {
            // Add touch support in addition to existing onclick
            dot.addEventListener('touchend', (e) => {
                e.preventDefault();
                showSlide(index);
            });
        });
        
        // Initialize first slide
        if (slides.length > 0) {
            showSlide(0);
        }
        
        // Auto-advance carousel (optional)
        setInterval(() => {
            if (document.visibilityState === 'visible' && slides.length > 1) {
                nextSlide();
            }
        }, 5000);
    });
});
