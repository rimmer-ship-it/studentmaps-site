// Hover Tilt Effect
const cards = document.querySelectorAll('.feature-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    const baseTransform = (card.classList.contains('card-3') && window.innerWidth > 850) 
      ? 'translateX(-50%)' 
      : '';

    card.style.transform = `${baseTransform} perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.zIndex = "100";
  });

  card.addEventListener('mouseleave', () => {
    const baseTransform = (card.classList.contains('card-3') && window.innerWidth > 850) 
      ? 'translateX(-50%)' 
      : '';
    card.style.transform = `${baseTransform} rotateX(0) rotateY(0) scale(1)`;
    card.style.zIndex = "20";
  });
});
