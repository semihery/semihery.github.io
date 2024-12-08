document.querySelector

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

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

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (window.scrollY > 80) {
        navbar.classList.add('smaller');
    } else {
        navbar.classList.remove('smaller');
        burger.classList.remove('toggle');
        navLinks.classList.remove('nav-active');
    }
});