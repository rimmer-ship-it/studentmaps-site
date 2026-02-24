// Intersection Observer for Hero Cards
const cards = document.querySelectorAll('.feature-card');
const heroVisual = document.querySelector('.hero-visual');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('card-visible');
        }, index * 250);
      });
    }
  });
}, { threshold: 0.2 });

if (heroVisual) cardObserver.observe(heroVisual);

// Hover interaction - Tilt Effect
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.zIndex = "100";
  });

  card.addEventListener('mouseleave', () => {
    // Reset transform, but maintain card-3's horizontal centering if applicable
    if (card.classList.contains('card-3') && window.innerWidth > 850) {
      card.style.transform = `translateX(-50%) rotateX(0) rotateY(0) scale(1)`;
    } else {
      card.style.transform = `rotateX(0) rotateY(0) scale(1)`;
    }
    card.style.zIndex = "10";
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
