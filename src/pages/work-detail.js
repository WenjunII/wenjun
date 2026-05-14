// ========================================
// Work Detail Page
// ========================================

import { works } from '../data/content.js';
import { renderGallery, initRevealObserver } from '../components/gallery.js';
import { renderVideoEmbed } from '../components/video-embed.js';

export function renderWorkDetail(container, params) {
  const work = works.find(w => w.id === params.id);
  if (!work) {
    container.innerHTML = '<div class="page-container"><p>Work not found.</p></div>';
    return;
  }

  const page = document.createElement('div');
  page.className = 'page-container';

  // Header
  const header = document.createElement('div');
  header.className = 'work-header animate-fade-in';
  header.innerHTML = `
    <h1 class="work-header__title">${work.title.en}</h1>
    ${work.title.cn ? `<div class="work-header__title-cn">${work.title.cn}</div>` : ''}
    <div class="work-header__meta">
      <span>${work.year}</span>
      <span>${work.medium}</span>
      ${work.collaborator ? `<span>with <a href="${work.collaborator.url}" target="_blank" rel="noopener">${work.collaborator.name}</a></span>` : ''}
    </div>
  `;
  page.appendChild(header);

  // Description
  if ((work.description.en && work.description.en.length > 0) || (work.description.cn && work.description.cn.length > 0)) {
    const desc = document.createElement('div');
    desc.className = 'work-description reveal';

    if (work.description.en && work.description.en.length > 0) {
      const en = document.createElement('div');
      en.className = 'work-description__en';
      en.innerHTML = work.description.en.map(p => `<p>${p}</p>`).join('');
      desc.appendChild(en);
    }

    if (work.description.cn && work.description.cn.length > 0) {
      const cn = document.createElement('div');
      cn.className = 'work-description__cn';
      cn.innerHTML = work.description.cn.map(p => `<p>${p}</p>`).join('');
      desc.appendChild(cn);
    }

    page.appendChild(desc);
  }

  // Links
  if (work.links && work.links.length > 0) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'work-links reveal';
    work.links.forEach(link => {
      const a = document.createElement('a');
      a.className = 'work-link';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = link.label;
      linksDiv.appendChild(a);
    });
    page.appendChild(linksDiv);
  }

  // Videos
  if (work.videos && work.videos.length > 0) {
    work.videos.forEach(video => {
      page.appendChild(renderVideoEmbed(video.id, video.title));
    });
  }

  // Gallery
  if (work.images && work.images.length > 0) {
    const galleryItems = work.images.map(img => {
      if (typeof img === 'string') {
        return `works/${work.id}/${img}`;
      }
      return { ...img, file: `works/${work.id}/${img.file}` };
    });
    const gallery = renderGallery(galleryItems, '/images/', { fullResolution: work.fullResolution });
    page.appendChild(gallery);
  }

  container.innerHTML = '';
  container.appendChild(page);
  window.scrollTo(0, 0);

  requestAnimationFrame(() => initRevealObserver());
}
