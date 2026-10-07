/* ===== PAGE NAVIGATION ===== */
const links = document.querySelectorAll('.nav a[data-page]');
const sections = document.querySelectorAll('section');

function navigateTo(page) {
  links.forEach(l => l.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  const targetLink = document.querySelector(`[data-page="${page}"]`);
  const targetSection = document.getElementById(page);

  if (targetLink) targetLink.classList.add('active');
  if (targetSection) targetSection.classList.add('active');

  localStorage.currentPage = page;
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// Restore last visited page on load
const savedPage = localStorage.currentPage;
if (savedPage && document.getElementById(savedPage)) {
  navigateTo(savedPage);
}

/* ===== THEME SWITCHER (Light / System / Dark) ===== */
const themeBtns = document.querySelectorAll('.theme-btn');

function applyTheme(mode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (mode === 'dark') {
    document.body.classList.add('dark');
  } else if (mode === 'light') {
    document.body.classList.remove('dark');
  } else {
    // system
    prefersDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');
  }

  // Update active button
  themeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === mode);
  });

  localStorage.themeMode = mode;
}

// Load saved mode or default to system
const savedMode = localStorage.themeMode || 'system';
applyTheme(savedMode);

// Button clicks
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

// Auto-update when system preference changes (only in system mode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((localStorage.themeMode || 'system') === 'system') applyTheme('system');
});

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll('.project-filters button');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.style.display = (filter === 'all' || card.classList.contains(filter)) ? 'block' : 'none';
    });
  });
});

/* ===== PROJECT POPUP ===== */
const popup = document.getElementById('popup');

function openPopup(title, year, desc) {
  document.getElementById('popupTitle').textContent = title;
  document.getElementById('popupYear').textContent = year;
  document.getElementById('popupDesc').textContent = desc;
  popup.style.display = 'flex';
}

function closePopup() {
  popup.style.display = 'none';
}

if (popup) {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });
}

/* ===== BLOG MODAL ===== */
const blogCards = document.querySelectorAll('.blog-card');
const blogModal = document.getElementById('blogModal');
const closeModal = blogModal ? blogModal.querySelector('.close-modal') : null;

blogCards.forEach(card => {
  card.addEventListener('click', () => {
    const img   = card.querySelector('img').src;
    const title = card.querySelector('h3').textContent;
    const meta  = card.querySelector('.meta').textContent;
    const desc  = card.querySelector('p').textContent;

    document.getElementById('modalImg').src             = img;
    document.getElementById('modalTitle').textContent   = title;
    document.getElementById('modalMeta').textContent    = meta;
    document.getElementById('modalDesc').textContent    = desc;

    blogModal.classList.add('active');
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => blogModal.classList.remove('active'));
}

if (blogModal) {
  blogModal.addEventListener('click', (e) => {
    if (e.target === blogModal) blogModal.classList.remove('active');
  });
}

/* ===== ESCAPE KEY — close any open modal ===== */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (blogModal && blogModal.classList.contains('active')) blogModal.classList.remove('active');
  if (popup && popup.style.display === 'flex') closePopup();
  const certModal = document.getElementById('certModal');
  if (certModal) certModal.style.display = 'none';
});

/* ===== LAST UPDATED DATE ===== */
const dateEl = document.getElementById('updateDate');
if (dateEl) {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  }).replace(',', ' /');
}

/* ===== CERTIFICATE MODAL ===== */
function openCertModal(imgSrc) {
  document.getElementById('certModalImg').src = imgSrc;
  document.getElementById('certModal').style.display = 'flex';
}

function closeCertModal() {
  document.getElementById('certModal').style.display = 'none';
  document.getElementById('certModalImg').src = '';
}

// Close on outside click — wrapped in null check to prevent crash
const certModalEl = document.getElementById('certModal');
if (certModalEl) {
  certModalEl.addEventListener('click', (e) => {
    if (e.target === certModalEl) closeCertModal();
  });
}

/* ===== DISABLE COPY PASTE ===== */
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('copy',        (e) => e.preventDefault());
document.addEventListener('cut',         (e) => e.preventDefault());
document.addEventListener('paste',       (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());

// Disable F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+S
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.key === 'u') ||
    (e.ctrlKey && e.key === 's') ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    (e.ctrlKey && e.shiftKey && e.key === 'C')
  ) {
    e.preventDefault();
  }
});
