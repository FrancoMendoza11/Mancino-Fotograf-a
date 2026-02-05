// ================= LOADER =================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    setTimeout(initAnimations, 100);
  }, 800);
});

// Año actual
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ================= ANIMACIONES =================
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Navbar scroll
  let lastScroll = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > 100) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScroll = current;
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ================= MODAL =================
function openAbout() {
  document.getElementById('aboutModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAbout() {
  document.getElementById('aboutModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// ================= MOBILE MENU =================
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

// ESC para cerrar modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAbout();
});

// Click fuera del modal
document.getElementById('aboutModal').addEventListener('click', e => {
  if (e.target.id === 'aboutModal') closeAbout();
});
