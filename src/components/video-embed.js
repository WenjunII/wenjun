// ========================================
// YouTube Video Embed Component
// ========================================

export function renderVideoEmbed(videoId, caption = '') {
  const wrapper = document.createElement('div');

  const embed = document.createElement('div');
  embed.className = 'video-embed reveal';
  embed.innerHTML = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1"
      title="${caption || 'Video'}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  wrapper.appendChild(embed);

  if (caption) {
    const cap = document.createElement('div');
    cap.className = 'video-embed__caption';
    cap.textContent = caption;
    wrapper.appendChild(cap);
  }

  return wrapper;
}
