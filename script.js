// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// INTERSECTION OBSERVER — FEATURE SECTION ITEMS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
};

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  featureObserver.observe(item);
});

// ============================================
// HERO CARDS — ÉÉN VOOR ÉÉN ZICHTBAAR
// via IntersectionObserver op .hero-visual
// ============================================
const cards = document.querySelectorAll('.glass-card');
const cardsContainer = document.querySelector('.cards-container');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            });
        }
    });
}, { threshold: 0.1 });

if (cardsContainer) {
    cardObserver.observe(cardsContainer);
}

// ============================================
// FEATURE CARDS — INTERACTIEVE TILT OP HOVER
// ============================================
cards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '';
    this.style.transform = ''; // laat CSS animatie hervatten
  });

  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    this.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.02)
    `;
  });

  // Klik pulse effect
  card.addEventListener('click', function () {
    this.style.transform = 'scale(1.04)';
    setTimeout(() => { this.style.transform = ''; }, 200);
  });
});

// ============================================
// PHONE MOCKUP — INTERACTIEVE TILT OP MUISBEWEGING
// ============================================
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    phoneMockup.style.transform = `
      perspective(1000px)
      rotateY(${x}deg)
      rotateX(${-y}deg)
    `;
  });
}

// ============================================
// LOADING ANIMATIE
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================
// LOGO PULSE OP KLIK
// ============================================
const logo = document.querySelector('.hero-logo');
if (logo) {
  logo.addEventListener('click', () => {
    logo.style.animation = 'none';
    setTimeout(() => {
      logo.style.animation = 'logoFloat 3s ease-in-out infinite';
    }, 10);
    logo.style.transform = 'scale(1.12)';
    setTimeout(() => { logo.style.transform = 'scale(1)'; }, 300);
  });
}

// ============================================
// PERFORMANCE: VERMINDER ANIMATIES (prefers-reduced-motion)
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}
