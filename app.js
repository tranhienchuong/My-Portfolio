// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const themeToggle = document.getElementById('theme-toggle');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contact-form');
    const skillBars = document.querySelectorAll('.skill__progress');

    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu immediately
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Handle smooth scrolling
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active section highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Theme Toggle
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-color-scheme', savedTheme);
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
        
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
        
        if (currentTheme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    // Initialize theme
    initTheme();

    // Project Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Skills Animation
    function animateSkills() {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth + '%';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skills when skills section comes into view
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkills, 300);
                }
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Contact Form Validation
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    const errorElements = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        subject: document.getElementById('subject-error'),
        message: document.getElementById('message-error')
    };

    function validateField(fieldName, value) {
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Name is required';
                } else if (value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(value.trim())) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'subject':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Subject is required';
                } else if (value.trim().length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters';
                }
                break;
            
            case 'message':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.trim().length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }

        return { isValid, errorMessage };
    }

    function showError(fieldName, message) {
        const errorElement = errorElements[fieldName];
        const field = formFields[fieldName];
        
        if (errorElement && field) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            field.style.borderColor = 'var(--color-error)';
        }
    }

    function hideError(fieldName) {
        const errorElement = errorElements[fieldName];
        const field = formFields[fieldName];
        
        if (errorElement && field) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            field.style.borderColor = 'var(--color-border)';
        }
    }

    // Real-time validation on blur
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field) {
            field.addEventListener('blur', () => {
                const validation = validateField(fieldName, field.value);
                if (!validation.isValid) {
                    showError(fieldName, validation.errorMessage);
                } else {
                    hideError(fieldName);
                }
            });

            field.addEventListener('input', () => {
                // Clear error on input if there was an error before
                if (errorElements[fieldName].classList.contains('show')) {
                    const validation = validateField(fieldName, field.value);
                    if (validation.isValid) {
                        hideError(fieldName);
                    }
                }
            });
        }
    });

    // Form submission with enhanced validation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validate all fields on submission
            Object.keys(formFields).forEach(fieldName => {
                const field = formFields[fieldName];
                if (field) {
                    const validation = validateField(fieldName, field.value);
                    if (!validation.isValid) {
                        showError(fieldName, validation.errorMessage);
                        isFormValid = false;
                    } else {
                        hideError(fieldName);
                    }
                }
            });

            if (isFormValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Clear any remaining error states
                    Object.keys(formFields).forEach(fieldName => {
                        hideError(fieldName);
                    });
                }, 1500);
            } else {
                // Scroll to first error field
                const firstErrorField = Object.keys(formFields).find(fieldName => {
                    return errorElements[fieldName].classList.contains('show');
                });
                
                if (firstErrorField && formFields[firstErrorField]) {
                    formFields[firstErrorField].focus();
                    formFields[firstErrorField].scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }

    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.2;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Initialize active nav link on page load
    updateActiveNavLink();

    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.classList.add('visible');
            }
        }, 100);
    });
});