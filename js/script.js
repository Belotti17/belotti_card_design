// ============================================
// LOADER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // Hide loader after animations complete
    setTimeout(() => {
        loader.classList.add('hidden');
        // Enable scrolling after loader is hidden
        document.body.style.overflow = 'visible';
    }, 1800);
    
    // Prevent scrolling during loader
    document.body.style.overflow = 'hidden';
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorCircle = document.getElementById('cursorCircle');
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .social-link, .btn-primary, .btn-secondary');

// Check if device is desktop
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isDesktop) {
    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move dot immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth circle movement
    function animateCircle() {
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;
        
        cursorCircle.style.left = circleX + 'px';
        cursorCircle.style.top = circleY + 'px';
        
        requestAnimationFrame(animateCircle);
    }
    
    animateCircle();
    
    // Cursor hover effects
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
            cursorCircle.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
            cursorCircle.classList.remove('active');
        });
    });
} else {
    // Hide custom cursor on mobile
    cursorDot.style.display = 'none';
    cursorCircle.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// ============================================
// ANIMATED TEXT
// ============================================
const dynamicText = document.getElementById('dynamicText');
const words = ['DESIGN.', 'BUILD.', 'CREATE.', 'SOLVE.', 'INNOVATE.'];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let isTypingComplete = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
        // Typing
        dynamicText.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;
        
        if (letterIndex === currentWord.length) {
            isTypingComplete = true;
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Pause at complete word
            return;
        }
    } else {
        // Deleting
        dynamicText.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
        
        if (letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing animation
if (dynamicText) {
    setTimeout(typeEffect, 1500);
}

// ============================================
// MOUSE PARALLAX EFFECT
// ============================================
const profileImage = document.querySelector('.profile-image-wrapper');
const profileRing = document.querySelector('.profile-ring');

if (isDesktop && profileImage && profileRing) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate parallax offset (max 10px)
        const offsetX = (clientX / windowWidth - 0.5) * 10;
        const offsetY = (clientY / windowHeight - 0.5) * 10;
        
        // Apply subtle parallax to profile image
        profileImage.style.transform = `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`;
        profileRing.style.transform = `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px) rotate(45deg)`;
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============================================
// SKILL CARDS HOVER EFFECT
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const number = card.querySelector('.skill-number');
        if (number) {
            number.style.transform = 'translateX(10px)';
            number.style.color = 'var(--primary)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const number = card.querySelector('.skill-number');
        if (number) {
            number.style.transform = 'translateX(0)';
            number.style.color = 'var(--gray)';
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// MARQUEE DUPLICATION FOR SEAMLESS LOOP
// ============================================
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    // Clone content for seamless loop
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Add keyboard support for interactive elements
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === 'A') {
            // Links already work with Enter, prevent double activation
            e.preventDefault();
            activeElement.click();
        }
    }
});

// ============================================
// DYNAMIC YEAR
// ============================================
const footerYear = document.querySelector('.footer-content p:first-child');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2026', year);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Use passive event listeners for scroll
window.addEventListener('scroll', () => {
    // Add scroll-based effects here if needed
}, { passive: true });

// Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize events here
    }, 250);
});

// ============================================
// CONTACT BUTTONS (modify URLs as needed)
// ============================================
const letsTalkButton = document.querySelector('.btn-primary');
if (letsTalkButton) {
    letsTalkButton.addEventListener('click', (e) => {
        // Replace with your actual email, phone, or WhatsApp link
        // e.g., window.location.href = 'mailto:your@email.com';
        // e.g., window.location.href = 'https://wa.me/yournumber';
        console.log('Connect button clicked - update with your contact details');
    });
}

console.log('Digital Business Card loaded successfully!');
console.log('Remember to update placeholders with your information.');