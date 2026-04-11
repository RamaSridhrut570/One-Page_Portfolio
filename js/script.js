/* ===================================================
   script.js — Portfolio interactivity
   =================================================== */

// ---------------------------------------------------
// Theme Toggle: Dark/Light mode
// ---------------------------------------------------
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

// Set initial theme
if (initialTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  document.body.classList.add('dark-theme');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
  html.setAttribute('data-theme', 'light');
  document.body.classList.remove('dark-theme');
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  if (newTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// ---------------------------------------------------
// Navbar: scroll effect + active-link highlighting
// ---------------------------------------------------
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Add/remove "scrolled" class for background blur
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Highlight the active nav link based on scroll position
  const scrollMid = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollMid >= top && scrollMid < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // Run once on load

// ---------------------------------------------------
// Mobile menu toggle
// ---------------------------------------------------
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------
// Contact form — client-side validation + feedback
// ---------------------------------------------------
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const messageEl = document.getElementById('message');

  // Clear previous error states
  [nameEl, emailEl, messageEl].forEach((el) => el.classList.remove('error'));
  formStatus.textContent = '';
  formStatus.className   = 'form-status';

  let valid = true;

  if (!nameEl.value.trim()) {
    nameEl.classList.add('error');
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailEl.value.trim())) {
    emailEl.classList.add('error');
    valid = false;
  }

  if (!messageEl.value.trim()) {
    messageEl.classList.add('error');
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = 'Please fill in all fields correctly.';
    formStatus.classList.add('error');
    return;
  }

  // Simulate a successful form submission
  formStatus.textContent = "Thanks for reaching out! I'll get back to you soon.";
  formStatus.classList.add('success');
  contactForm.reset();
});

// ---------------------------------------------------
// Footer year
// ---------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
