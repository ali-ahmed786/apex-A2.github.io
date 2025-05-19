// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.bb-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Ensure AOS is initialized and all code runs after DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    if (window.AOS) {
        AOS.init({
            duration: 900,
            once: true
        });
    }

    // Hamburger menu for mobile nav
    const navToggle = document.getElementById('bb-nav-toggle');
    const nav = document.getElementById('bb-nav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            navToggle.classList.toggle('open');
        });
    }

    // Testimonial Slider
    const testimonials = [
        {
            text: "The team at Apex Marketing Services delivered exceptional results. Their expertise and dedication to our project was outstanding.",
            name: "John Smith",
            position: "CEO, Tech Solutions",
            image: "images/client1.jpg"
        },
        {
            text: "Working with Apex Marketing Services was a game-changer for our business. Their strategic approach and attention to detail are unmatched.",
            name: "Sarah Johnson",
            position: "Marketing Director, Innovate Inc",
            image: "images/client2.jpg"
        },
        {
            text: "The results we've seen since partnering with Apex Marketing Services have exceeded our expectations. Highly recommended!",
            name: "Michael Brown",
            position: "Founder, Growth Ventures",
            image: "images/client3.jpg"
        }
    ];

    let currentTestimonial = 0;
    const testimonialSlider = document.querySelector('.testimonial-slider');
    function updateTestimonial() {
        if (!testimonialSlider) return;
        const testimonial = testimonials[currentTestimonial];
        testimonialSlider.innerHTML = `
            <div class="testimonial-card">
                <p>"${testimonial.text}"</p>
                <div class="client-info">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;
    }
    if (testimonialSlider) {
        updateTestimonial();
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);
    }

    // Form submission handling
    const contactForm = document.querySelector('.bb-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.bb-work-card, .bb-service-card, .bb-impact-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Animated counting for Global Impact numbers
    function animateCount(el, target, duration = 1800) {
        let start = 0;
        let startTime = null;
        const isInt = Number.isInteger(target);
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (target - start) + start);
            el.textContent = isInt ? value.toLocaleString() : value;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = isInt ? target.toLocaleString() : target;
            }
        }
        requestAnimationFrame(step);
    }
    let counted = false;
    function handleCountOnScroll() {
        if (counted) return;
        const section = document.getElementById('impact');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counted = true;
            document.querySelectorAll('.bb-impact-number').forEach(el => {
                const target = parseInt(el.getAttribute('data-count'), 10);
                animateCount(el, target);
            });
        }
    }
    window.addEventListener('scroll', handleCountOnScroll);
    window.addEventListener('load', handleCountOnScroll);

    // Nav color change on scroll
    const header = document.querySelector('.bb-header');
    const hero = document.querySelector('.bb-hero');
    function handleNavColor() {
        if (!header || !hero) return;
        const heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom <= 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavColor);
    window.addEventListener('load', handleNavColor);
}); 