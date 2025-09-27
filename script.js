// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Construction Popup functionality
    const constructionPopup = document.getElementById('construction-popup');
    const closePopupBtn = document.getElementById('close-popup');
    
    // Show popup on page load
    if (constructionPopup) {
        constructionPopup.style.display = 'flex';
        
        // Function to close popup
        function closePopup() {
            constructionPopup.classList.add('hidden');
            constructionPopup.style.display = 'none';
        }
        
        // Close popup when clicking the button
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closePopup();
            });
        }
        
        // Close popup when clicking outside the content
        constructionPopup.addEventListener('click', function(e) {
            if (e.target === constructionPopup) {
                closePopup();
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !constructionPopup.classList.contains('hidden')) {
                closePopup();
            }
        });
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .product-card, .stat-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Crypto price animation (mock data)
    function animateCryptoPrices() {
        const priceElements = document.querySelectorAll('.card-value');
        
        priceElements.forEach(element => {
            const currentPrice = parseFloat(element.textContent.replace(/[$,]/g, ''));
            const change = (Math.random() - 0.5) * 100; // Random change
            const newPrice = Math.max(0, currentPrice + change);
            
            // Format the price
            let formattedPrice;
            if (newPrice > 1000) {
                formattedPrice = '$' + newPrice.toLocaleString('en-US', {maximumFractionDigits: 0});
            } else {
                formattedPrice = '$' + newPrice.toFixed(2);
            }
            
            element.textContent = formattedPrice;
            
            // Update change indicator
            const changeElement = element.nextElementSibling;
            if (changeElement && changeElement.classList.contains('card-change')) {
                const changePercent = ((change / currentPrice) * 100).toFixed(2);
                changeElement.textContent = (changePercent > 0 ? '+' : '') + changePercent + '%';
                
                // Update color based on change
                changeElement.classList.remove('positive', 'negative');
                changeElement.classList.add(changePercent > 0 ? 'positive' : 'negative');
            }
        });
    }
    
    // Update prices every 5 seconds
    setInterval(animateCryptoPrices, 5000);
    
    // Exchange form functionality
    const exchangeForm = document.querySelector('.exchange-form');
    const swapButton = document.querySelector('.swap-button');
    
    if (swapButton && exchangeForm) {
        swapButton.addEventListener('click', function() {
            const fromInput = exchangeForm.querySelector('.exchange-input-group:first-child input');
            const toInput = exchangeForm.querySelector('.exchange-input-group:last-child input');
            const fromSelect = exchangeForm.querySelector('.exchange-input-group:first-child select');
            const toSelect = exchangeForm.querySelector('.exchange-input-group:last-child select');
            
            // Swap values
            const tempValue = fromInput.value;
            const tempSelectValue = fromSelect.value;
            
            fromInput.value = toInput.value;
            toInput.value = tempValue;
            fromSelect.value = toSelect.value;
            toSelect.value = tempSelectValue;
            
            // Calculate new conversion
            calculateExchange();
        });
    }
    
    // Exchange calculation
    function calculateExchange() {
        const fromInput = exchangeForm?.querySelector('.exchange-input-group:first-child input');
        const toInput = exchangeForm?.querySelector('.exchange-input-group:last-child input');
        const fromSelect = exchangeForm?.querySelector('.exchange-input-group:first-child select');
        const toSelect = exchangeForm?.querySelector('.exchange-input-group:last-child select');
        
        if (!fromInput || !toInput || !fromSelect || !toSelect) return;
        
        const fromAmount = parseFloat(fromInput.value) || 0;
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        
        // Mock exchange rates
        const rates = {
            'BTC': { 'USD': 45234.50, 'EUR': 41250.30, 'GBP': 35678.90 },
            'ETH': { 'USD': 2831.75, 'EUR': 2580.25, 'GBP': 2234.80 },
            'ADA': { 'USD': 0.67, 'EUR': 0.61, 'GBP': 0.53 }
        };
        
        if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
            const convertedAmount = fromAmount * rates[fromCurrency][toCurrency];
            toInput.value = convertedAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    }
    
    // Listen for input changes in exchange form
    const exchangeFromInput = exchangeForm?.querySelector('.exchange-input-group:first-child input');
    const exchangeSelects = exchangeForm?.querySelectorAll('select');
    
    if (exchangeFromInput) {
        exchangeFromInput.addEventListener('input', calculateExchange);
    }
    
    if (exchangeSelects) {
        exchangeSelects.forEach(select => {
            select.addEventListener('change', calculateExchange);
        });
    }
    
    // Initial calculation
    calculateExchange();
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !service || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon. 🚀', 'success');
            this.reset();
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
            animation: slideInRight 0.3s ease-out forwards;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Particle animation for background
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Create particles
        const particles = ['💎', '🚀', '⭐', '💰', '📊', '⚡', '🪙'];
        
        function addParticle() {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        }
        
        // Add particle animation CSS
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
        
        // Add particles periodically
        setInterval(addParticle, 3000);
    }
    
    // Initialize particles
    createParticles();
    
    // Button click animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Emoji animations on hover
    document.querySelectorAll('.service-icon, .product-icon, .stat-icon, .info-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    });
    
    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.product-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.product-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Console welcome message
    console.log(`
    🚀 Welcome to Invest Matrix Solutions! 💎
    
    This website features:
    ✅ Responsive design
    ✅ Smooth animations
    ✅ Interactive elements
    ✅ Modern UI/UX
    ✅ Crypto exchange simulation
    ✅ Professional styling
    
    Built with ❤️ for digital innovation!
    `);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}