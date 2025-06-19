// State management
const state = {
  sidebarCollapsed: false,
  darkMode: localStorage.getItem('darkMode') === 'true',
  currentPage: 'dashboard'
};

// DOM elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelectorAll('.nav-link[data-page]'); // Only select nav links with data-page
const searchBtn = document.getElementById('searchBtn');
const notificationBtn = document.getElementById('notificationBtn');

// Initialize the application
function init() {
  setupEventListeners();
  applyTheme();
  setupResponsiveDesign();
  animateStats();
  setupTooltips();
}

// Event listeners
function setupEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
  }
  
  // Navigation links - only add listeners to links with data-page attribute
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
  });
  
  // Mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileSidebar);
  }
  
  // Header buttons
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  if (notificationBtn) {
    notificationBtn.addEventListener('click', handleNotifications);
  }
  
  // Window resize
  window.addEventListener('resize', handleResize);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Mobile sidebar functionality
function toggleMobileSidebar() {
  if (sidebar) {
    sidebar.classList.toggle('mobile-open');
  }
  if (mobileOverlay) {
    mobileOverlay.classList.toggle('active');
  }
  document.body.style.overflow = sidebar && sidebar.classList.contains('mobile-open') ? 'hidden' : '';
}

function closeMobileSidebar() {
  if (sidebar) {
    sidebar.classList.remove('mobile-open');
  }
  if (mobileOverlay) {
    mobileOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// Theme functionality
function toggleTheme() {
  state.darkMode = themeToggle.checked;
  applyTheme();
  localStorage.setItem('darkMode', state.darkMode);
}

function applyTheme() {
  if (state.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.className = 'fas fa-sun';
    }
    if (themeToggle) {
      themeToggle.checked = true;
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) {
      themeIcon.className = 'fas fa-moon';
    }
    if (themeToggle) {
      themeToggle.checked = false;
    }
  }
}

// Navigation functionality - FIXED VERSION
function handleNavigation(e) {
  e.preventDefault();
  
  const clickedLink = e.currentTarget;
  const page = clickedLink.getAttribute('data-page');
  
  // Handle special cases
  if (page === 'logout') {
    handleLogout();
    return;
  }
  
  // Remove active class from all navigation links that have data-page attribute
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to clicked link
  clickedLink.classList.add('active');
  
  // Update current page
  state.currentPage = page;
  
  // Show loading animation
  showPageLoading();
  
  // Simulate page load
  setTimeout(() => {
    updatePageContent(page);
    hidePageLoading();
  }, 500);
  
  // Close mobile sidebar if open
  if (window.innerWidth <= 1024) {
    closeMobileSidebar();
  }
}

// Page content management
function updatePageContent(page) {
  const welcomeText = document.querySelector('.welcome-text');
  const pageTitle = document.querySelector('.page-title');
  
  const pageConfig = {
    dashboard: { title: 'Dashboard', welcome: 'Welcome back, Andrea 👋' },
    bookings: { title: 'Bookings', welcome: 'Manage your bookings' },
    leads: { title: 'Leads', welcome: 'Track your leads' },
    eoi: { title: 'EOI', welcome: 'Expression of Interest' }
  };
  
  const config = pageConfig[page] || pageConfig.dashboard;
  
  if (welcomeText) {
    welcomeText.textContent = config.welcome;
  }
  if (pageTitle) {
    pageTitle.textContent = config.title;
  }
}

function showPageLoading() {
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.style.opacity = '0.7';
    mainContent.style.pointerEvents = 'none';
  }
}

function hidePageLoading() {
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.style.opacity = '1';
    mainContent.style.pointerEvents = 'auto';
  }
}

// Header functionality
function handleSearch() {
  const searchQuery = prompt('Enter search query:');
  if (searchQuery) {
    console.log('Searching for:', searchQuery);
  }
}

function handleNotifications() {
  alert('Notifications panel would open here');
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    console.log('Logging out...');
  }
}

// Responsive design
function setupResponsiveDesign() {
  handleResize();
}

function handleResize() {
  const isMobile = window.innerWidth <= 1024;
  
  if (mobileMenuBtn) {
    if (isMobile) {
      mobileMenuBtn.style.display = 'flex';
    } else {
      mobileMenuBtn.style.display = 'none';
      closeMobileSidebar();
    }
  }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + K: Search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    handleSearch();
  }
  
  // Ctrl/Cmd + D: Toggle dark mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    if (themeToggle) {
      themeToggle.click();
    }
  }
  
  // Escape: Close mobile sidebar
  if (e.key === 'Escape') {
    closeMobileSidebar();
  }
}

// Animations
function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');
  
  statValues.forEach((stat, index) => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
    
    if (numericValue) {
      stat.textContent = '0';
      
      setTimeout(() => {
        animateNumber(stat, 0, numericValue, finalValue, 1000);
      }, index * 200);
    }
  });
}

function animateNumber(element, start, end, finalText, duration) {
  const startTime = performance.now();
  const isPrice = finalText.includes('$');
  const suffix = finalText.replace(/[0-9,]/g, '');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * easeOutCubic(progress));
    
    if (isPrice) {
      element.textContent = '$' + current.toLocaleString();
    } else {
      element.textContent = current.toLocaleString() + suffix.replace(',', '');
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = finalText;
    }
  }
  
  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Tooltips
function setupTooltips() {
  // Tooltips are handled by CSS
}

// Load saved preferences
function loadPreferences() {
  const savedTheme = localStorage.getItem('darkMode');
  
  if (savedTheme === 'true') {
    state.darkMode = true;
    if (themeToggle) {
      themeToggle.checked = true;
    }
  }
  
  applyTheme();
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('Dashboard error:', e.error);
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    init();
  });
} else {
  loadPreferences();
  init();
}

const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
if (sidebarCloseBtn) {
  sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
}
// Add resize debouncing
window.addEventListener('resize', debounce(handleResize, 250));