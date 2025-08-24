// ===== LOADING SCREEN WITH MATRIX EFFECT =====
window.addEventListener('load', function() {
    createMatrixEffect();
    simulateLoading();
});

function createMatrixEffect() {
    const matrixBg = document.getElementById('matrixBg');
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[]();.,';
    const columns = Math.floor(window.innerWidth / 15);
    
    for (let i = 0; i < columns; i++) {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: absolute;
            left: ${i * 15}px;
            top: -20px;
            color: #6366f1;
            font-size: 12px;
            font-family: 'JetBrains Mono', monospace;
            animation: matrixFall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        matrixBg.appendChild(drop);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            0% { transform: translateY(-20px); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function simulateLoading() {
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    const percentage = document.getElementById('loadingPercentage');
    const typingLoader = document.getElementById('typingLoader');
    
    const loadingMessages = [
        'Loading components...',
        'Initializing portfolio...',
        'Connecting to creativity...',
        'Almost ready...',
        'Welcome aboard!'
    ];
    
    let messageIndex = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        percentage.textContent = Math.floor(progress) + '%';
        
        // Change loading message
        if (progress > messageIndex * 20 && messageIndex < loadingMessages.length - 1) {
            messageIndex++;
            typingLoader.textContent = loadingMessages[messageIndex];
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('fade-out');
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                    initializePortfolio();
                }, 800);
            }, 500);
        }
    }, 120);
}

// ===== INITIALIZE PORTFOLIO =====
function initializePortfolio() {
    startAnimations();
    setupNavigation();
    setupScrollEffects();
}

// ===== START ANIMATIONS =====
function startAnimations() {
    // Rotating text animation - FIXED to show full text
    const words = document.querySelectorAll('.word');
    let currentIndex = 0;
    
    function rotateWords() {
        words[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }
    
    // Set interval for word rotation
    setInterval(rotateWords, 3000);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.fade-in, .fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ===== SETUP NAVIGATION =====
function setupNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation dots
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const target = sections[index];
            const navHeight = document.querySelector('nav').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // Update active navigation
    window.addEventListener('scroll', throttle(() => {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                // Update nav dots
                navDots.forEach(dot => dot.classList.remove('active'));
                if (navDots[index]) navDots[index].classList.add('active');
                
                // Update nav links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 16));
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    // Parallax effects
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        // Floating icons parallax
        document.querySelectorAll('.floating-icons i').forEach((icon, index) => {
            const speed = (index + 1) * 0.1;
            icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        // Profile ring rotation
        const profileRing = document.querySelector('.profile-ring');
        if (profileRing) {
            profileRing.style.transform = `rotate(${scrolled * 0.2}deg)`;
        }
        
        // Geometric shapes movement
        document.querySelectorAll('.shape').forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            const x = Math.sin(scrolled * 0.001 + index) * 20;
            const y = scrolled * speed;
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${scrolled * 0.1}deg)`;
        });
    }, 16));
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        window.scrollTo({
            top: target.offsetTop - navHeight,
            behavior: 'smooth'
        });
    }
}

// ===== PROJECT INTERACTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Social link interactions
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Certificate card interactions
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
        
        // Create celebration effect
        createCelebration();
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        
        konamiCode = [];
    }
});

function createCelebration() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 10000;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent += `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show celebration message
    const message = document.createElement('div');
    message.textContent = '🎉 KONAMI CODE ACTIVATED! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10001;
        animation: celebrationPulse 0.5s ease-in-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    const celebrationStyle = document.createElement('style');
    celebrationStyle.textContent += `
        @keyframes celebrationPulse {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(celebrationStyle);
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
