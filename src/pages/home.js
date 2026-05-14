// ========================================
// Home Page
// ========================================

import { works, publications, commissions } from '../data/content.js';
import { initRevealObserver } from '../components/gallery.js';

export function renderHomePage(container) {
  const page = document.createElement('div');
  page.className = 'page-container';

  // Find Aliens of Me
  const work = works.find(w => w.id === 'aliens-of-me');
  
  if (!work) {
    container.innerHTML = '<div class="page-container"><p>Aliens of Me not found.</p></div>';
    return;
  }

  const hasImages = work.images && work.images.length > 0;
  const firstImg = hasImages ? work.images[0] : null;
  const thumbFile = firstImg ? (typeof firstImg === 'string' ? firstImg : firstImg.file) : null;

  let html = '';
  html += '<div class="home-grid home-grid--single">';
  
  html += `
    <a href="#/works/${work.id}" class="home-item home-item--centered animate-fade-in-up" id="home-${work.id}" style="width: 100%;">
      <div class="home-item__image-container">
        ${thumbFile
          ? `<img class="home-item__image" src="images/works/${work.id}/${thumbFile}" alt="${work.title.en}" loading="lazy" />`
          : `<div class="home-item__placeholder">
               <span class="home-item__placeholder-text">${work.title.en}</span>
             </div>`
        }
      </div>
      <div class="home-item__info" style="margin-top: 2rem; text-align: left; padding-bottom: 2rem;">
        <div class="home-item__title" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 500; margin-bottom: 0.5rem; color: var(--color-text);">${work.title.en}</div>
        ${work.title.cn ? `<div class="home-item__title-cn" style="font-family: var(--font-cn); font-size: 1.25rem; color: var(--color-text); margin-bottom: 0.75rem;">${work.title.cn}</div>` : ''}
        <div class="home-item__meta" style="font-family: var(--font-heading); font-size: 1rem; color: var(--color-text-dim); letter-spacing: 0.03em; text-transform: uppercase;">${work.year} · ${work.medium}</div>
      </div>
    </a>
  `;
  
  html += '</div>';

  page.innerHTML = html;
  container.innerHTML = '';
  container.appendChild(page);

  requestAnimationFrame(() => initRevealObserver());
}
