// ========================================
// Info Page (Biography / CV / Contact)
// ========================================

import { bio, cv, cvCN, contact } from '../data/content.js';
import { initRevealObserver } from '../components/gallery.js';

export function renderBiographyEN(container) {
  const page = document.createElement('div');
  page.className = 'page-container info-page';

  let html = '';

  // Bio EN
  html += '<div class="info-bio animate-fade-in">';
  html += '<div class="info-bio__en">';
  html += bio.en.map(p => `<p>${p}</p>`).join('');
  html += '</div>';
  html += '</div>';

  // Awards
  html += renderCVSection('Awards, Residencies, Fellowships & Honors', cv.awards);
  // Exhibitions
  html += renderCVSection('Selected Exhibitions', cv.exhibitions);
  // Commissions
  html += renderCVSection('Commissions', cv.commissions);
  // Collections
  html += renderCollectionsSection('Collections', cv.collections);
  // Education
  html += renderCVSection('Education', cv.education);

  // Full CV link
  html += `<div class="info-section reveal">
    <a class="work-link" href="${cv.fullCvUrl}" target="_blank" rel="noopener">View Full CV ↗</a>
  </div>`;

  page.innerHTML = html;
  container.innerHTML = '';
  container.appendChild(page);
  window.scrollTo(0, 0);

  requestAnimationFrame(() => initRevealObserver());
}

export function renderBiographyCN(container) {
  const page = document.createElement('div');
  page.className = 'page-container info-page';

  let html = '';

  // Bio CN
  html += '<div class="info-bio animate-fade-in">';
  if (bio.cn && bio.cn.length > 0) {
    html += '<div class="info-bio__cn" style="margin-top:0; color:var(--color-text);">';
    html += bio.cn.map(p => `<p>${p}</p>`).join('');
    html += '</div>';
  }
  html += '</div>';

  // Awards CN
  html += renderCVSection('奖项, 驻留, 奖学金 & 荣誉', cvCN.awards);
  // Exhibitions CN
  html += renderCVSection('选展', cvCN.exhibitions);
  // Commissions CN
  html += renderCVSection('委托创作', cvCN.commissions);
  html += renderCollectionsSection('收藏', cvCN.collections);
  html += renderCVSection('教育', cvCN.education);

  // Full CV link
  html += `<div class="info-section reveal">
    <a class="work-link" href="${cvCN.fullCvUrl}" target="_blank" rel="noopener">查看完整简历 ↗</a>
  </div>`;

  page.innerHTML = html;
  container.innerHTML = '';
  container.appendChild(page);
  window.scrollTo(0, 0);

  requestAnimationFrame(() => initRevealObserver());
}

// Helper functions to clean up the code
function renderCVSection(title, items) {
  let html = '<div class="info-section reveal">';
  html += `<h2 class="info-section__title">${title}</h2>`;
  items.forEach(item => {
    html += `<div class="info-entry"><span class="info-entry__year">${item.year}</span><span class="info-entry__content">${item.text}</span></div>`;
  });
  html += '</div>';
  return html;
}

function renderCollectionsSection(title, items) {
  let html = '<div class="info-section reveal">';
  html += `<h2 class="info-section__title">${title}</h2>`;
  items.forEach(item => {
    html += `<div class="info-entry"><span class="info-entry__year"></span><span class="info-entry__content">${item}</span></div>`;
  });
  html += '</div>';
  return html;
}

export function renderContact(container) {
  const page = document.createElement('div');
  page.className = 'page-container info-page';

  page.innerHTML = `
    <div class="work-header animate-fade-in">
      <h1 class="work-header__title">Contact</h1>
      <div class="work-header__title-cn">联系</div>
    </div>
    <div class="contact-links reveal" style="margin-top: var(--space-8);">
      <a class="contact-link" href="mailto:${contact.email}">
        <span class="contact-link__label">Email</span>
        <span>${contact.email}</span>
      </a>
      <a class="contact-link" href="${contact.instagram.url}" target="_blank" rel="noopener">
        <span class="contact-link__label">Instagram</span>
        <span>${contact.instagram.handle}</span>
      </a>
      <a class="contact-link" href="${contact.linkedin.url}" target="_blank" rel="noopener">
        <span class="contact-link__label">LinkedIn</span>
        <span>${contact.linkedin.handle}</span>
      </a>
    </div>
  `;

  container.innerHTML = '';
  container.appendChild(page);
  window.scrollTo(0, 0);

  requestAnimationFrame(() => initRevealObserver());
}
