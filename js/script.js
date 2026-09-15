// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Testimonial Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Form Validation
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(error => error.style.display = 'none');
            document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
                .forEach(input => input.style.borderColor = '');
            
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').style.display = 'block';
                nameInput.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
                document.getElementById('emailError').style.display = 'block';
                emailInput.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Phone validation
            const phoneInput = document.getElementById('phone');
            if (!phoneInput.value.trim()) {
                document.getElementById('phoneError').style.display = 'block';
                phoneInput.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Date validation
            const dateInput = document.getElementById('date');
            if (!dateInput.value) {
                // Create error element for date if it doesn't exist
                let dateError = document.getElementById('dateError');
                if (!dateError) {
                    dateError = document.createElement('div');
                    dateError.className = 'form-error';
                    dateError.id = 'dateError';
                    dateError.textContent = 'Please select a date';
                    dateInput.parentNode.appendChild(dateError);
                }
                dateError.style.display = 'block';
                dateInput.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Time validation
            const timeInput = document.getElementById('time');
            if (!timeInput.value) {
                // Create error element for time if it doesn't exist
                let timeError = document.getElementById('timeError');
                if (!timeError) {
                    timeError = document.createElement('div');
                    timeError.className = 'form-error';
                    timeError.id = 'timeError';
                    timeError.textContent = 'Please select a time';
                    timeInput.parentNode.appendChild(timeError);
                }
                timeError.style.display = 'block';
                timeInput.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Guests validation
            const guestsSelect = document.getElementById('guests');
            if (!guestsSelect.value) {
                // Create error element for guests if it doesn't exist
                let guestsError = document.getElementById('guestsError');
                if (!guestsError) {
                    guestsError = document.createElement('div');
                    guestsError.className = 'form-error';
                    guestsError.id = 'guestsError';
                    guestsError.textContent = 'Please select number of guests';
                    guestsSelect.parentNode.appendChild(guestsError);
                }
                guestsError.style.display = 'block';
                guestsSelect.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            if (isValid) {
                // Hide form and show success message
                bookingForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    bookingForm.reset();
                    bookingForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 3000);
            }
        });
    }
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Initialize AOS (if using) or other animations
    // For now, we'll add a simple fade-in effect on scroll
    const fadeElements = document.querySelectorAll('.menu-item, .chef-card, .testimonial-slide');
    
    function checkFadeIn() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for fade-in
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkFadeIn);
    // Check on load in case elements are already in view
    checkFadeIn();
});