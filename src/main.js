// ========================================
// Main Entry Point
// ========================================

import './styles/index.css';
import './styles/layout.css';
import './styles/pages.css';
import './styles/responsive.css';

import { Router } from './router.js';
import { renderNavigation, renderMenuToggle, renderOverlay, updateActiveNav, closeMobileMenu } from './components/navigation.js';
import { renderHomePage } from './pages/home.js';
import { renderWorkDetail } from './pages/work-detail.js';
import { renderBookDetail } from './pages/book-detail.js';
import { renderCommissionDetail } from './pages/commission-detail.js';
import { renderBiographyEN, renderBiographyCN, renderContact } from './pages/info.js';

import { siteInfo } from './data/content.js';

// Initialize app
function init() {
  const app = document.getElementById('app');
  document.title = siteInfo.title;

  // Render navigation
  const menuToggle = renderMenuToggle();
  const overlay = renderOverlay();
  const sidebar = renderNavigation();
  const main = document.createElement('main');
  main.className = 'main-content';
  main.id = 'main-content';

  app.appendChild(menuToggle);
  app.appendChild(overlay);
  app.appendChild(sidebar);
  app.appendChild(main);

  // Setup router
  const router = new Router(main);

  router.add('/', () => renderHomePage(main));

  router.add('/works/:id', (params) => renderWorkDetail(main, params));

  router.add('/books/:id', (params) => renderBookDetail(main, params));

  router.add('/commission/:id', (params) => renderCommissionDetail(main, params));

  router.add('/info/biography', () => renderBiographyEN(main));

  router.add('/info/biography-cn', () => renderBiographyCN(main));

  router.add('/info/contact', () => renderContact(main));

  // Update active nav on route change
  router.onNavigate = (route) => {
    updateActiveNav(route);
    closeMobileMenu();
  };

  // Handle nav link clicks to close mobile menu
  sidebar.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-item');
    if (link) {
      closeMobileMenu();
    }
  });

  // Start router
  router.resolve();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
