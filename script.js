// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
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

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature items
document.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// ============================================
// FLOATING CARDS INTERACTIVE TILT EFFECT
// ============================================
const cards = document.querySelectorAll('.feature-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
        this.style.transform = '';
        
        // Restore original position for card-3
        if (this.classList.contains('card-3')) {
            this.style.transform = 'translateX(-50%)';
        }
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Special handling for card-3 (bottom center)
        if (this.classList.contains('card-3')) {
            this.style.transform = `
                translateX(-50%)
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
                scale(1.02)
            `;
        } else {
            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
                scale(1.02)
            `;
        }
    });
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    
    // Parallax cards
    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.04;
        const offset = scrollPosition * speed;
        
        if (scrollPosition < window.innerHeight) {
            if (card.classList.contains('card-3')) {
                // Maintain centered position for card-3
                card.style.transform = `translateX(-50%) translateY(${offset}px)`;
            } else {
                card.style.transform = `translateY(${offset}px)`;
            }
        }
    });
});

// ============================================
// PHONE MOCKUP INTERACTIVE TILT
// ============================================
const phoneMockup = document.querySelector('.phone-mockup');

if (phoneMockup) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        
        phoneMockup.style.transform = `
            perspective(1000px)
            rotateY(${x}deg)
            rotateX(${-y}deg)
        `;
    });
}

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// STAGGER ANIMATION FOR CARDS ON LOAD
// ============================================
cards.forEach((card, index) => {
    card.style.opacity = '0';
    
    // Different initial transforms for each card
    if (card.classList.contains('card-3')) {
        card.style.transform = 'translateX(-50%) translateY(30px)';
    } else {
        card.style.transform = 'translateY(30px)';
    }
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        
        if (card.classList.contains('card-3')) {
            card.style.transform = 'translateX(-50%) translateY(0)';
        } else {
            card.style.transform = 'translateY(0)';
        }
    }, 400 + (index * 150));
});

// ============================================
// GRADIENT BACKGROUND MOUSE FOLLOW
// ============================================
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        hero.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(3, 195, 209, 0.15) 0%, transparent 40%),
            #000000
        `;
    });
}

// ============================================
// LOGO PULSE EFFECT ON CLICK
// ============================================
const logo = document.querySelector('.hero-logo');
if (logo) {
    logo.addEventListener('click', () => {
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = 'logoFloat 3s ease-in-out infinite';
        }, 10);
        
        // Add pulse effect
        logo.style.transform = 'scale(1.1)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 300);
    });
}

// ============================================
// PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ============================================
// CARD CLICK TO EXPAND (Optional Feature)
// ============================================
cards.forEach(card => {
    card.addEventListener('click', function() {
        // Add pulse effect on click
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = '';
            if (this.classList.contains('card-3')) {
                this.style.transform = 'translateX(-50%)';
            }
        }, 200);
    });
});

// ============================================
// CONSOLE ART
// ============================================
console.log(`
%c███████╗████████╗██╗   ██╗██████╗ ███████╗███╗   ██╗████████╗
%c██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝████╗  ██║╚══██╔══╝
%c███████╗   ██║   ██║   ██║██║  ██║█████╗  ██╔██╗ ██║   ██║   
%c╚════██║   ██║   ██║   ██║██║  ██║██╔══╝  ██║╚██╗██║   ██║   
%c███████║   ██║   ╚██████╔╝██████╔╝███████╗██║ ╚████║   ██║   
%c╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
%c
%c███╗   ███╗ █████╗ ██████╗ ███████╗
%c████╗ ████║██╔══██╗██╔══██╗██╔════╝
%c██╔████╔██║███████║██████╔╝███████╗
%c██║╚██╔╝██║██╔══██║██╔═══╝ ╚════██║
%c██║ ╚═╝ ██║██║  ██║██║     ███████║
%c╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝
%c
%c🚀 Student Maps - Discover the best spots in your city
`, 
'color: #03C3D1', 'color: #03C3D1', 'color: #03C3D1', 
'color: #03C3D1', 'color: #03C3D1', 'color: #03C3D1',
'color: #FFFFFF',
'color: #06B6D4', 'color: #06B6D4', 'color: #06B6D4', 
'color: #06B6D4', 'color: #06B6D4', 'color: #06B6D4',
'color: #FFFFFF',
'color: #9CA3AF; font-size: 12px;'
);

console.log('%c✨ Looking for something? Check out our GitHub!', 'color: #03C3D1; font-size: 14px; font-weight: bold;');
