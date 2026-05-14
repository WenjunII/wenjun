// ========================================
// Book (Publication) Detail Page
// ========================================

import { publications } from '../data/content.js';
import { renderGallery, initRevealObserver } from '../components/gallery.js';

export function renderBookDetail(container, params) {
  const book = publications.find(b => b.id === params.id);
  if (!book) {
    container.innerHTML = '<div class="page-container"><p>Publication not found.</p></div>';
    return;
  }

  const page = document.createElement('div');
  page.className = 'page-container';

  // Header
  const header = document.createElement('div');
  header.className = 'work-header animate-fade-in';
  header.innerHTML = `
    <h1 class="work-header__title">${book.title.en}</h1>
    ${book.title.cn ? `<div class="work-header__title-cn">${book.title.cn}</div>` : ''}
    <div class="work-header__meta">
      <span>${book.format.en} / ${book.format.cn}</span>
      ${book.collaborator ? `<span>with <a href="${book.collaborator.url}" target="_blank" rel="noopener">${book.collaborator.name}</a></span>` : ''}
    </div>
  `;
  page.appendChild(header);

  // Details
  const details = document.createElement('div');
  details.className = 'work-description reveal';

  let detailsHtml = '<div class="work-description__en">';
  detailsHtml += `<p><strong>Author:</strong> ${book.author.en}</p>`;
  if (book.publisher) {
    detailsHtml += `<p><strong>Publisher:</strong> <a href="${book.publisher.url}" target="_blank" rel="noopener">${book.publisher.en}</a></p>`;
  }
  detailsHtml += `<p><strong>Published:</strong> ${book.published.en}</p>`;
  if (book.edition) {
    detailsHtml += `<p><strong>Edition:</strong> ${book.edition}</p>`;
  }
  detailsHtml += '</div>';

  detailsHtml += '<div class="work-description__cn" style="margin-top: var(--space-6);">';
  detailsHtml += `<p>作者：${book.author.cn}</p>`;
  if (book.publisher) {
    detailsHtml += `<p>出版社：<a href="${book.publisher.url}" target="_blank" rel="noopener">${book.publisher.cn}</a></p>`;
  }
  detailsHtml += `<p>出版日期：${book.published.cn}</p>`;
  if (book.edition) {
    detailsHtml += `<p>版数：${book.edition}</p>`;
  }
  detailsHtml += '</div>';

  details.innerHTML = detailsHtml;
  page.appendChild(details);

  // Gallery
  if (book.images && book.images.length > 0) {
    const galleryItems = book.images.map(img => {
      if (typeof img === 'string') return `books/${book.id}/${img}`;
      return { ...img, file: `books/${book.id}/${img.file}` };
    });
    const gallery = renderGallery(galleryItems, '/images/', { fullResolution: book.fullResolution });
    page.appendChild(gallery);
  }

  container.innerHTML = '';
  container.appendChild(page);
  window.scrollTo(0, 0);

  requestAnimationFrame(() => initRevealObserver());
}
