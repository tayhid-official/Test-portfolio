// Elements
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu li a');
const viewCountEl = document.getElementById('view-count');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Dark/light theme toggle
themeToggle.addEventListener('click', () => {
  const isDark = themeStyle.getAttribute('href') === 'dark-theme.css';
  themeStyle.setAttribute('href', isDark ? 'style.css' : 'dark-theme.css');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', themeStyle.getAttribute('href'));
});

// On page load
window.addEventListener('DOMContentLoaded', () => {
  // Load saved theme
  const saved = localStorage.getItem('theme');
  if (saved) {
    themeStyle.setAttribute('href', saved);
    themeToggle.textContent = saved === 'dark-theme.css' ? '☀️' : '🌙';
  }

  // Increment and display page views
  let views = parseInt(localStorage.getItem('pageViews') || '0', 10);
  views++;
  localStorage.setItem('pageViews', views);
  if (viewCountEl) viewCountEl.textContent = views;
});

// Scroll events
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Soft background color shift
  document.body.style.backgroundColor =
    scrollY > 200
      ? scrollY > 800
        ? '#e4eaf0'
        : `rgba(229,236,243,${(scrollY - 200) / 600})`
      : '';

  // Scroll-spy: highlight menu links
  sections.forEach((sec, idx) => {
    const top = sec.offsetTop - 70;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      navLinks[idx].classList.add('active');
    }
  });
});
