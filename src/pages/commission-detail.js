// ========================================
// Commission Detail Page
// ========================================

import { commissions } from '../data/content.js';
import { renderGallery, initRevealObserver } from '../components/gallery.js';

export function renderCommissionDetail(container, params) {
  const comm = commissions.find(c => c.id === params.id);
  if (!comm) {
    container.innerHTML = '<div class="page-container"><p>Commission not found.</p></div>';
    return;
  }

  const page = document.createElement('div');
  page.className = 'page-container';

  // Header
  const header = document.createElement('div');
  header.className = 'work-header animate-fade-in';
  header.innerHTML = `
    <h1 class="work-header__title">${comm.title.en}</h1>
    ${comm.title.cn ? `<div class="work-header__title-cn">${comm.title.cn}</div>` : ''}
    <div class="work-header__meta">
      <span>${comm.year}</span>
      ${comm.collaborator ? `<span>with <a href="${comm.collaborator.url}" target="_blank" rel="noopener">${comm.collaborator.name}</a></span>` : ''}
    </div>
  `;
  page.appendChild(header);

  // Description
  const desc = document.createElement('div');
  desc.className = 'work-description reveal';
  desc.innerHTML = `
    <div class="work-description__en"><p>${comm.description.en}</p></div>
    <div class="work-description__cn"><p>${comm.description.cn}</p></div>
  `;
  page.appendChild(desc);

  // Link
  if (comm.link) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'work-links reveal';
    const a = document.createElement('a');
    a.className = 'work-link';
    a.href = comm.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = comm.link;
    linksDiv.appendChild(a);
    page.appendChild(linksDiv);
  }

  // Gallery
  if (comm.images && comm.images.length > 0) {
    const galleryItems = comm.images.map(img => {
      if (typeof img === 'string') return `commission/${comm.id}/${img}`;
      return { ...img, file: `commission/${comm.id}/${img.file}` };
    });
    const gallery = renderGallery(galleryItems, 'images/', { fullResolution: comm.fullResolution });
    page.appendChild(gallery);
  }

  container.innerHTML = '';
  container.appendChild(page);
  window.scrollTo(0, 0);

  requestAnimationFrame(() => initRevealObserver());
}
