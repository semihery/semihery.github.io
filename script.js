document.querySelector

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const heroContainer = document.querySelector('.hero-container');

    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Hero scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        // Unified threshold for navbar and hero container
        if (window.scrollY > 80) {
            navbar.classList.add('smaller');
            heroContainer.classList.add('scrolled');
        } else {
            navbar.classList.remove('smaller');
            heroContainer.classList.remove('scrolled');
            burger.classList.remove('toggle');
            navLinks.classList.remove('nav-active');
        }
    }

    // Initial check for page load with hash
    setTimeout(handleScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Handle resize events to ensure proper display on all devices
    window.addEventListener('resize', function() {
        // Force recalculation of responsive elements
        handleScroll();
    });
});