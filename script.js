// ================================
// Scroll suave no menu do header
// ================================
const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // Só faz scroll se for âncora interna
    if (href.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(href);

      window.scrollTo({
        top: section.offsetTop - 70, // compensa o header fixo
        behavior: 'smooth'
      });

      // Fecha o menu mobile ao clicar
      mobileMenu.classList.add('hidden');
      mobileButton.setAttribute('aria-expanded', 'false');
    }
  });
});

// ================================
// Menu Mobile toggle
// ================================
const mobileButton = document.querySelector('header button[aria-label="Abrir menu"]');
const mobileMenu = document.getElementById('mobile-menu');

mobileButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('hidden');

  mobileMenu.classList.toggle('hidden', !isOpen);
  mobileButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// ================================
// FAQ – Accordion
// ================================
const faqButtons = document.querySelectorAll('#faq button');

faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const contentId = btn.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    // Fecha todos antes de abrir outro
    faqButtons.forEach(otherBtn => {
      const otherId = otherBtn.getAttribute('aria-controls');
      const otherContent = document.getElementById(otherId);
      otherBtn.setAttribute('aria-expanded', 'false');
      otherContent.classList.add('hidden');
    });

    // Alterna o clicado
    btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    content.classList.toggle('hidden', expanded);
  });
});

// ================================
// Destaque nos cards de produto via JS
// ================================
const productCards = document.querySelectorAll('#produtos article');

productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.transition = '0.25s ease';
    card.style.boxShadow = '0 12px 20px -5px rgba(0,0,0,0.07)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0px)';
    card.style.boxShadow = '';
  });
});

// ================================
// Atualiza automaticamente o ano no footer
// ================================
const anoEl = document.getElementById('ano-atual');
if (anoEl) {
  anoEl.textContent = new Date().getFullYear();
}
