/* ===========================
   JAVASCRIPT - Complete Interactive Features
   =========================== */

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initIntersectionObserver();
    initContactForm();
    initScrollToTop();
    initActiveNavLink();
});

/* ===========================
   MOBILE MENU TOGGLE
   =========================== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!hamburger) return;

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/* ===========================
   SMOOTH SCROLL NAVIGATION
   =========================== */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a, .product-link, [href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/* ===========================
   INTERSECTION OBSERVER FOR ANIMATIONS
   =========================== */
function initIntersectionObserver() {
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

    const fadeElements = document.querySelectorAll(
        '.product-card, .contact-item, .stat-card, .testimonial-card, .benefit-card, .gallery-item'
    );
    fadeElements.forEach(el => {
        el.classList.add('fade-in-scroll');
        observer.observe(el);
    });
}

/* ===========================
   CONTACT FORM HANDLING
   =========================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        if (!isValidPhone(phone)) {
            showAlert('Please enter a valid phone number', 'error');
            return;
        }

        // Show success message
        showAlert('✓ Message sent successfully! We will contact you soon.', 'success');

        // Log form data (in production, send to server)
        console.log('Form Data:', {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            timestamp: new Date()
        });

        // Reset form
        contactForm.reset();
    });
}

/* ===========================
   SCROLL TO TOP FUNCTIONALITY
   =========================== */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===========================
   ACTIVE NAVIGATION LINK
   =========================== */
function initActiveNavLink() {
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
}

/* ===========================
   UTILITY FUNCTIONS
   =========================== */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
}

function showAlert(message, type = 'success') {
    // Remove existing alert
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add styles if not already added
    if (!document.querySelector('style[data-alert-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-alert-styles', 'true');
        style.textContent = `
            .alert {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }

            .alert-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .alert-success .alert-content {
                background-color: #2ecc71;
            }

            .alert-error .alert-content {
                background-color: #e74c3c;
            }

            .alert-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0 0 0 15px;
                transition: all 0.3s ease;
            }

            .alert-close:hover {
                transform: scale(1.2);
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

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (alertDiv.parentElement) {
                    alertDiv.remove();
                }
            }, 300);
        }
    }, 4000);
}

/* ===========================
   WHATSAPP INTEGRATION
   =========================== */
function openWhatsApp(phoneNumber) {
    const cleanPhone = phoneNumber.replace(/[-\s\(\)]/g, '');
    const whatsappLink = `https://wa.me/${cleanPhone}?text=Hello%20Ibrahim%20Spray%20Center`;
    window.open(whatsappLink, '_blank');
}

/* ===========================
   PHONE CALL HANDLER
   =========================== */
function callNumber(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

/* ===========================
   STICKY NAVBAR ENHANCEMENT
   =========================== */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

/* ===========================
   PRODUCT CARD CLICK HANDLER
   =========================== */
document.addEventListener('click', function(e) {
    if (e.target.closest('.product-card')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const message = `I'm interested in: ${productName}`;
        console.log('Product selected:', productName);
    }
});

/* ===========================
   LAZY LOADING FOR IMAGES
   =========================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===========================
   PAGE LOAD ANIMATION
   =========================== */
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('Ibrahim Spray Center Website - Successfully Loaded! 🌾');
    console.log('Website Version: 1.0');
    console.log('Last Updated: 2024');
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

/* ===========================
   KEYBOARD SHORTCUTS
   =========================== */
document.addEventListener('keydown', function(event) {
    // Escape key to close mobile menu
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }

    // Ctrl/Cmd + Shift + C to call
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        callNumber('0300-8166897');
    }
});

/* ===========================
   PERFORMANCE MONITORING
   =========================== */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

/* ===========================
   FORM FIELD AUTO-FOCUS
   =========================== */
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

/* ===========================
   COUNTER ANIMATION
   =========================== */
function animateCounter(element, target, duration = 2000) {
    if (!element) return;

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

/* ===========================
   PRINT FUNCTIONALITY
   =========================== */
function printPage() {
    window.print();
}

/* ===========================
   SHARE SOCIAL MEDIA
   =========================== */
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
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
            break;
        default:
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

/* ===========================
   CONTACT BUTTON SHORTCUTS
   =========================== */
function quickContact(type = 'call') {
    const mainNumber = '0300-8166897';

    if (type === 'call') {
        callNumber(mainNumber);
    } else if (type === 'whatsapp') {
        openWhatsApp(mainNumber);
    }
}

/* ===========================
   INITIALIZATION LOG
   =========================== */
console.log('╔════════════════════════════════════════╗');
console.log('║  Ibrahim Spray Center Website         ║');
console.log('║  Version: 1.0                         ║');
console.log('║  Status: ✓ Ready                      ║');
console.log('╚════════════════════════════════════════╝');
console.log('Contact: 0300-8166897');
console.log('Products: Seeds, Sprays, Fertilizers, Neem');
