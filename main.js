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


// ================= PORTFOLIO TABS - SOLO AL CLICKEAR =================
let currentCategory = null;

function showCategory(category) {
  // Ocultar TODAS las categorías primero
  document.querySelectorAll('.category-content').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('active', 'visible');
  });
  
  // Remover clase activa de TODAS las solapas
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active', 'bg-gold/5', 'border-gold', 'text-gold');
    btn.style.backgroundColor = '';
    btn.style.borderColor = '';
    btn.style.color = '';
  });
  
  // Mostrar SOLO la categoría seleccionada
  const selectedCategory = document.getElementById(`category-${category}`);
  if (selectedCategory) {
    selectedCategory.classList.remove('hidden');
    selectedCategory.classList.add('active');
    
    // Animar los elementos dentro de la categoría
    setTimeout(() => {
      selectedCategory.querySelectorAll('.image-hover').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 50);
    
    currentCategory = category;
  }
  
  // Activar visualmente la solapa clickeada
  const activeTab = document.getElementById(`tab-${category}`);
  if (activeTab) {
    activeTab.classList.add('active', 'border-gold', 'text-gold');
    activeTab.style.backgroundColor = 'rgba(198, 164, 90, 0.05)';
  }
}

// ================= LIGHTBOX =================
function openLightbox(imageSrc, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImage');
  const captionEl = document.getElementById('lightboxCaption');
  
  img.src = imageSrc;
  img.alt = caption;
  captionEl.textContent = caption;
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (event && event.target.id !== 'lightboxModal' && event.target.id !== 'lightboxImage' && event.target.tagName !== 'BUTTON') {
    return;
  }
  
  const modal = document.getElementById('lightboxModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Cerrar lightbox con ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// NO mostrar ninguna categoría al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  // Asegurar que todas las categorías estén ocultas al inicio
  document.querySelectorAll('.category-content').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Quitar cualquier estilo activo de las solapas
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active', 'bg-gold/5', 'border-gold', 'text-gold');
  });
});
