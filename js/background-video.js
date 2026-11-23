const section = document.querySelector('#game-week');
const video = document.querySelector('#week-video');
const toggle = document.querySelector('#week-video-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function updateLabel() {
  toggle.textContent = video.paused ? 'Відтворити фон' : 'Призупинити фон';
}

function updateVideo() {
  if (reducedMotion.matches) {
    toggle.hidden = true;
    if (video.hasAttribute('src')) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    return;
  }

  if (!video.hasAttribute('src')) video.src = video.dataset.src;
  toggle.hidden = false;
  updateLabel();
}

toggle.addEventListener('click', () => {
  if (video.paused) {
    video.play().catch(updateLabel);
  } else {
    video.pause();
  }
});
video.addEventListener('play', updateLabel);
video.addEventListener('pause', updateLabel);
video.addEventListener('error', () => { toggle.hidden = true; });

const observer = new IntersectionObserver((entries) => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  observer.disconnect();
  reducedMotion.addEventListener('change', updateVideo);
  updateVideo();
}, { rootMargin: '180px' });
observer.observe(section);
