document.addEventListener('DOMContentLoaded', () => {

// 1. Kaarten binnenvliegen
const cards = document.querySelectorAll('.glass-card');
const visualSections = document.querySelectorAll('.hero-visual');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionCards = entry.target.querySelectorAll('.glass-card');
      sectionCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 200);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

visualSections.forEach(section => cardObserver.observe(section));

// 2. Scroll-to-Reveal Tekst Animatie — lijn voor lijn
const revealLines = document.querySelectorAll('.reveal-line');
const scrollTextSection = document.querySelector('.scroll-text-section');

if (scrollTextSection) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add('visible');
          }, index * 140);
        });
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sectionObserver.observe(scrollTextSection);
}

document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
});

// 3. Tilt effect op kaarten
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
    card.style.zIndex = "50";
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
    card.style.zIndex = "20";
  });
});

// 4. Phone Mockup tilt
const phones = document.querySelectorAll('.phone-mockup');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  phones.forEach(phone => {
    phone.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
});

// 5. Feature blokken één voor één van beneden animeren
const featureItems = document.querySelectorAll('.feature-item');
const featuresSection = document.querySelector('.features');

if (featuresSection) {
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                featureItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200); // 200ms vertraging per blok
                });
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    featureObserver.observe(featuresSection);
}

  // Smooth scroll — Deze stond buiten de DOMContentLoaded en had een fout
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Bij de features sectie willen we naar de wrapper scrollen
      const offset = target.classList.contains('features') ? 0 : 0;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

});
