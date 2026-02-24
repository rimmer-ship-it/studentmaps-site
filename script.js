// ============================================
// STAGGERED CARD ANIMATION ON SCROLL
// ============================================
const observeOptions = { threshold: 0.3 };

const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    // Reset de positie afhankelijk van welke kaart het is
                    if (card.classList.contains('card-3')) {
                        card.style.transform = 'translate(-50%, 0)';
                    } else {
                        card.style.transform = 'translate(0, 0)';
                    }
                }, index * 250); // Stagger effect van 250ms
            });
        }
    });
}, observeOptions);

const wrapper = document.querySelector('.phone-visual-wrapper');
if (wrapper) { entranceObserver.observe(wrapper); }

// ============================================
// INTERACTIVE TILT EFFECT (Subtiel)
// ============================================
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${y * -10}deg) 
            rotateY(${x * 10}deg) 
            translateY(-5px)
            ${card.classList.contains('card-3') ? 'translateX(-50%)' : ''}
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = card.classList.contains('card-3') ? 'translate(-50%, 0)' : 'translate(0, 0)';
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log("%c🚀 Student Maps Live!", "color: #03C3D1; font-size: 20px; font-weight: bold;");
