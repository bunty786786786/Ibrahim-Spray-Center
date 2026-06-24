/* ===========================
   JAVASCRIPT - Interactive Features
   =========================== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scroll behavior
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in-scroll class to elements
    const fadeElements = document.querySelectorAll('.product-card, .contact-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in-scroll');
        observer.observe(el);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            // Validate email
            if (!isValidEmail(formData.email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            // Show success message
            showAlert('Message sent successfully! We will contact you soon.', 'success');

            // Reset form
            this.reset();

            // In production, you would send this data to your server
            console.log('Form Data:', formData);
        });
    }

    // WhatsApp Click Handler
    const whatsappNumbers = ['0300-8166897', '0300-8003422', '0308-4892390'];
    const phoneElements = document.querySelectorAll('.contact-item p');
    
    phoneElements.forEach(el => {
        if (el.textContent.includes('-')) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', function() {
                const phone = this.textContent.trim();
                openWhatsApp(phone);
            });
        }
    });
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type = 'success') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles
    const style = document.createElement('style');
    if (!document.querySelector('style[data-alert-styles]')) {
        style.setAttribute('data-alert-styles', 'true');
        style.textContent = `
            .alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }

            .alert-success {
                background-color: #2ecc71;
                box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
            }

            .alert-error {
                background-color: #e74c3c;
                box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 768px) {
                .alert {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(alertDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

function openWhatsApp(phone) {
    // Remove formatting
    const cleanPhone = phone.replace(/[-\s]/g, '');
    // Assuming Pakistan country code
    const whatsappLink = `https://wa.me/92${cleanPhone.substring(1)}?text=Hello%20Ibrahim%20Spray%20Center`;
    window.open(whatsappLink, '_blank');
}

// Sticky Navigation on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-color);
        border-bottom: 2px solid var(--accent-color);
    }
`;
document.head.appendChild(style);

// Counter Animation for Stats (if you add stats section)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Lazy Loading for Images (future enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Print Friendly Function
function printPage() {
    window.print();
}

// Share Function
function shareOnSocial(platform) {
    const url = window.location.href;
    const title = 'Ibrahim Spray Center - Agricultural Products';
    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Initialize Page
console.log('Ibrahim Spray Center Website - Loaded Successfully');
