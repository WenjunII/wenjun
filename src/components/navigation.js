// ========================================
// Navigation Component
// ========================================

import { works, publications, commissions, siteInfo } from '../data/content.js';

export function renderNavigation() {
  const sections = [
    {
      title: { en: 'Works', cn: '作品' },
      items: works.map(w => ({
        label: { en: w.title.en, cn: w.title.cn },
        hash: `/works/${w.id}`,
      })),
    },
    {
      title: { en: 'Self-Publications', cn: '自出版' },
      items: publications.map(p => ({
        label: { en: p.title.en, cn: p.title.cn },
        hash: `/books/${p.id}`,
      })),
    },
    {
      title: { en: 'Commissioned Works', cn: '工作' },
      items: commissions.map(c => ({
        label: { en: c.title.en, cn: c.title.cn },
        hash: `/commission/${c.id}`,
      })),
    },
    {
      title: { en: 'Info.', cn: '个人信息' },
      items: [
        { label: { en: 'Biography / CV', cn: null }, hash: '/info/biography' },
        { label: { en: null, cn: '简介 / 简历' }, hash: '/info/biography-cn' },
        { label: { en: 'Contact', cn: '联系' }, hash: '/info/contact' },
      ],
    },
  ];

  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar__brand">
      <a href="#/" id="nav-brand">
        ${siteInfo.name.en}
        <span class="sidebar__brand-cn">${siteInfo.name.cn}</span>
      </a>
    </div>
    <div class="sidebar__nav">
      ${sections.map((section, i) => `
        <div class="nav-section${i === 0 ? ' expanded' : ''}" data-section="${i}">
          <div class="nav-section__title" data-toggle="${i}">
            <span class="nav-section__arrow">▶</span>
            ${section.title.en}
            <span class="nav-section__title-cn">${section.title.cn}</span>
          </div>
          <div class="nav-section__items">
            ${section.items.map(item => `
              <a class="nav-item" href="#${item.hash}" data-route="${item.hash}">
                ${item.label.en || ''}
                ${item.label.cn ? `<span class="nav-item__cn">${item.label.cn}</span>` : ''}
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="sidebar__footer">
      © ${new Date().getFullYear()} ${siteInfo.name.en}
    </div>
  `;

  // Toggle sections
  sidebar.querySelectorAll('.nav-section__title').forEach(title => {
    title.addEventListener('click', () => {
      const section = title.closest('.nav-section');
      section.classList.toggle('expanded');
    });
  });

  return sidebar;
}

export function renderMobileHeader() {
  const header = document.createElement('div');
  header.className = 'mobile-header';
  header.id = 'mobile-header';

  header.innerHTML = `
    <div class="mobile-header__brand">
      <a href="#/">
        ${siteInfo.name.en}
        <span class="mobile-header__brand-cn">${siteInfo.name.cn}</span>
      </a>
    </div>
    <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
      <span class="menu-toggle__bar"></span>
      <span class="menu-toggle__bar"></span>
      <span class="menu-toggle__bar"></span>
    </button>
  `;

  const btn = header.querySelector('#menu-toggle');
  btn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
    if (isOpen) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => overlay.classList.add('visible'));
    } else {
      overlay.classList.remove('visible');
      setTimeout(() => { overlay.style.display = 'none'; }, 400);
    }
  });

  return header;
}

export function renderOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';
  overlay.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const btn = document.getElementById('menu-toggle');
    sidebar.classList.remove('open');
    btn.classList.remove('active');
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
  });
  return overlay;
}

export function updateActiveNav(route) {
  document.querySelectorAll('.nav-item').forEach(item => {
    const itemRoute = item.getAttribute('data-route');
    if (itemRoute === route) {
      item.classList.add('active');
      // Expand parent section
      const section = item.closest('.nav-section');
      if (section) section.classList.add('expanded');
    } else {
      item.classList.remove('active');
    }
  });
}

export function closeMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('menu-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    if (btn) btn.classList.remove('active');
    if (overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => { overlay.style.display = 'none'; }, 400);
    }
  }
}
