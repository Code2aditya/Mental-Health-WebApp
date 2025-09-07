/**
 * Mental Health Support App - Main JavaScript
 * Core functionality and application logic
 */

// App state management
const AppState = {
  currentUser: null,
  currentPage: 'home',
  moodData: [],
  navigationActive: false
};

// DOM elements
const DOM = {
  navToggle: null,
  navMenu: null,
  navLinks: null,
  heroButtons: null,
  emergencyButton: null,
  chatButton: null,
  featureCards: null
};

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Main app initialization function
 */
function initializeApp() {
  console.log('🧠 Mental Health Support App - Initializing...');
  
  // Cache DOM elements
  cacheDOMElements();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initialize components
  initializeNavigation();
  initializeButtons();
  initializeCards();
  
  // Setup accessibility features
  setupAccessibility();
  
  // Load user preferences if available
  loadUserPreferences();
  
  console.log('✅ App initialized successfully');
}

/**
 * Cache frequently used DOM elements
 */
function cacheDOMElements() {
  DOM.navToggle = document.querySelector('.nav-toggle');
  DOM.navMenu = document.querySelector('.nav-menu');
  DOM.navLinks = document.querySelectorAll('.nav-link');
  DOM.heroButtons = document.querySelectorAll('.hero-buttons .btn');
  DOM.emergencyButton = document.querySelector('.btn-emergency');
  DOM.chatButton = document.querySelector('.btn-help');
  DOM.featureCards = document.querySelectorAll('.feature-card');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Navigation toggle for mobile
  if (DOM.navToggle) {
    DOM.navToggle.addEventListener('click', toggleMobileNav);
  }
  
  // Navigation links
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
  });
  
  // Hero buttons
  DOM.heroButtons.forEach(button => {
    button.addEventListener('click', handleHeroButtonClick);
  });
  
  // Emergency support button
  if (DOM.emergencyButton) {
    DOM.emergencyButton.addEventListener('click', handleEmergencyClick);
  }
  
  // Chat support button
  if (DOM.chatButton) {
    DOM.chatButton.addEventListener('click', handleChatClick);
  }
  
  // Feature cards hover effects
  DOM.featureCards.forEach(card => {
    card.addEventListener('mouseenter', handleCardHover);
    card.addEventListener('mouseleave', handleCardLeave);
  });
  
  // Window resize handler
  window.addEventListener('resize', handleWindowResize);
  
  // Smooth scroll for anchor links
  document.addEventListener('click', handleSmoothScroll);
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
  // Set active navigation item based on current page
  updateActiveNavigation();
  
  // Handle mobile navigation state
  updateMobileNavigation();
}

/**
 * Initialize button interactions
 */
function initializeButtons() {
  // Add ripple effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRippleEffect);
  });
}

/**
 * Initialize card animations and interactions
 */
function initializeCards() {
  // Setup intersection observer for card animations
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver(handleCardIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    DOM.featureCards.forEach(card => {
      cardObserver.observe(card);
    });
  }
}

/**
 * Setup accessibility features
 */
function setupAccessibility() {
  // Add keyboard navigation support
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Setup focus trap for modal dialogs (when implemented)
  setupFocusManagement();
  
  // Add skip links for screen readers
  addSkipLinks();
}

/**
 * Handle mobile navigation toggle
 */
function toggleMobileNav() {
  AppState.navigationActive = !AppState.navigationActive;
  
  if (DOM.navMenu) {
    DOM.navMenu.classList.toggle('active');
  }
  
  if (DOM.navToggle) {
    DOM.navToggle.classList.toggle('active');
  }
  
  // Update ARIA attributes
  const expanded = AppState.navigationActive;
  DOM.navToggle?.setAttribute('aria-expanded', expanded.toString());
  DOM.navMenu?.setAttribute('aria-hidden', (!expanded).toString());
}

/**
 * Handle navigation link clicks
 */
function handleNavigation(event) {
  const link = event.target;
  const href = link.getAttribute('href');
  
  // Update active state
  DOM.navLinks.forEach(navLink => navLink.classList.remove('active'));
  link.classList.add('active');
  
  // Close mobile nav if open
  if (AppState.navigationActive) {
    toggleMobileNav();
  }
  
  // Handle single-page navigation
  if (href.startsWith('#')) {
    event.preventDefault();
    const targetId = href.substring(1);
    scrollToSection(targetId);
    AppState.currentPage = targetId;
  }
  
  // Analytics tracking (placeholder)
  trackNavigation(href);
}

/**
 * Handle hero button clicks
 */
function handleHeroButtonClick(event) {
  const button = event.target;
  const buttonText = button.textContent.trim();
  
  console.log(`Hero button clicked: ${buttonText}`);
  
  if (buttonText === 'Get Started') {
    // Navigate to dashboard or signup
    handleGetStarted();
  } else if (buttonText === 'Learn More') {
    // Scroll to features section
    scrollToSection('features');
  }
  
  // Track button interaction
  trackButtonClick('hero', buttonText);
}

/**
 * Handle emergency support button click
 */
function handleEmergencyClick(event) {
  event.preventDefault();
  
  console.log('🚨 Emergency support requested');
  
  // Show emergency resources modal
  showEmergencyResources();
  
  // Track emergency interaction
  trackEmergencyInteraction();
}

/**
 * Handle chat support button click
 */
function handleChatClick(event) {
  event.preventDefault();
  
  console.log('💬 Chat support requested');
  
  // Initialize chat widget or show support options
  initializeChatSupport();
  
  // Track chat interaction
  trackChatInteraction();
}

/**
 * Handle feature card hover effects
 */
function handleCardHover(event) {
  const card = event.target;
  card.style.transform = 'translateY(-8px)';
}

function handleCardLeave(event) {
  const card = event.target;
  card.style.transform = 'translateY(0)';
}

/**
 * Handle card intersection for animations
 */
function handleCardIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}

/**
 * Handle window resize events
 */
function handleWindowResize() {
  // Close mobile nav on desktop
  if (window.innerWidth > 768 && AppState.navigationActive) {
    toggleMobileNav();
  }
  
  // Update navigation state
  updateMobileNavigation();
}

/**
 * Handle smooth scrolling for anchor links
 */
function handleSmoothScroll(event) {
  const target = event.target;
  
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
    event.preventDefault();
    const targetId = target.getAttribute('href').substring(1);
    scrollToSection(targetId);
  }
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(event) {
  // ESC key closes mobile nav
  if (event.key === 'Escape' && AppState.navigationActive) {
    toggleMobileNav();
  }
  
  // Tab navigation enhancement
  if (event.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
}

/**
 * Create ripple effect on button click
 */
function createRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Scroll to a specific section smoothly
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const targetPosition = section.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Update active navigation item
 */
function updateActiveNavigation() {
  const hash = window.location.hash.substring(1) || 'home';
  
  DOM.navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${hash}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Update mobile navigation state
 */
function updateMobileNavigation() {
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile && AppState.navigationActive) {
    AppState.navigationActive = false;
    DOM.navMenu?.classList.remove('active');
    DOM.navToggle?.classList.remove('active');
  }
}

/**
 * Show emergency resources modal
 */
function showEmergencyResources() {
  // Create and show modal with emergency resources
  const modal = createEmergencyModal();
  document.body.appendChild(modal);
  
  // Focus management
  const firstFocusable = modal.querySelector('button');
  firstFocusable?.focus();
}

/**
 * Create emergency resources modal
 */
function createEmergencyModal() {
  const modal = document.createElement('div');
  modal.className = 'emergency-modal';
  modal.innerHTML = `
    <div class="emergency-modal-content">
      <h2>🚨 Emergency Resources</h2>
      <div class="emergency-resources">
        <div class="emergency-item">
          <h3>Immediate Crisis Support</h3>
          <p><strong>988 Suicide & Crisis Lifeline</strong></p>
          <a href="tel:988" class="btn btn-emergency">Call 988</a>
        </div>
        <div class="emergency-item">
          <h3>Emergency Services</h3>
          <p><strong>911 for immediate emergency</strong></p>
          <a href="tel:911" class="btn btn-emergency">Call 911</a>
        </div>
        <div class="emergency-item">
          <h3>Crisis Text Line</h3>
          <p><strong>Text HOME to 741741</strong></p>
          <a href="sms:741741" class="btn btn-help">Text Support</a>
        </div>
      </div>
      <button class="btn btn-secondary close-modal">Close</button>
    </div>
  `;
  
  // Add close functionality
  modal.querySelector('.close-modal')?.addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  return modal;
}

/**
 * Initialize chat support system
 */
function initializeChatSupport() {
  console.log('Initializing chat support...');
  // Placeholder for chat integration
  alert('Chat support coming soon! In the meantime, please use the emergency resources if you need immediate help.');
}

/**
 * Handle get started flow
 */
function handleGetStarted() {
  console.log('Starting user onboarding...');
  // Placeholder for user registration/dashboard navigation
  alert('Welcome! User dashboard and onboarding coming soon.');
}

/**
 * Setup focus management for accessibility
 */
function setupFocusManagement() {
  // Remove outline for mouse users, keep for keyboard users
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}

/**
 * Add skip links for screen readers
 */
function addSkipLinks() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
  try {
    const preferences = localStorage.getItem('mindwell-preferences');
    if (preferences) {
      const parsed = JSON.parse(preferences);
      // Apply user preferences
      console.log('User preferences loaded:', parsed);
    }
  } catch (error) {
    console.log('No user preferences found or error loading:', error);
  }
}

/**
 * Analytics and tracking functions
 */
function trackNavigation(href) {
  console.log('Navigation tracked:', href);
  // Placeholder for analytics
}

function trackButtonClick(section, buttonText) {
  console.log('Button click tracked:', { section, buttonText });
  // Placeholder for analytics
}

function trackEmergencyInteraction() {
  console.log('Emergency interaction tracked');
  // Placeholder for analytics
}

function trackChatInteraction() {
  console.log('Chat interaction tracked');
  // Placeholder for analytics
}

/**
 * Utility functions
 */
const Utils = {
  // Format date for display
  formatDate: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },
  
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// Export functions for testing or external use
window.MindWellApp = {
  AppState,
  toggleMobileNav,
  scrollToSection,
  showEmergencyResources,
  Utils
};
