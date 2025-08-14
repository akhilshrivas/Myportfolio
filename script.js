// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
    themeToggleMobile.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    themeToggleMobile.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    themeToggleMobile.textContent = '☀️';
  }
}

// Hamburger menu functionality
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll('section, .details-container, .color-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add typing animation to title
function addTypingAnimation() {
  const title = document.querySelector('.title');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        title.style.borderRight = 'none';
      }
    };
    
    setTimeout(typeWriter, 500);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  addScrollAnimations();
  addTypingAnimation();
  addResponsiveNavigation();
  addTouchSupport();
  
  // Theme toggle event listeners
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      smoothScrollTo(targetId);
    });
  });
});

// Responsive navigation functionality
function addResponsiveNavigation() {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const menuLinks = document.querySelector('.menu-links');
  
  if (hamburgerIcon && menuLinks) {
    // Close menu when clicking on a link
    const menuItems = menuLinks.querySelectorAll('a');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.remove('open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburgerIcon.contains(event.target) && !menuLinks.contains(event.target)) {
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.remove('open');
      }
    });
  }
}

// Add touch support for mobile devices
function addTouchSupport() {
  // Add touch feedback for buttons
  const buttons = document.querySelectorAll('.btn, .theme-btn');
  buttons.forEach(button => {
    button.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
  
  // Add touch feedback for cards
  const cards = document.querySelectorAll('.details-container, .contact-info-container');
  cards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
}
