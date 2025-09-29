// Current year
document.querySelector('#year').textContent = new Date().getFullYear();

// Lightbox for profile picture
const profilePic = document.querySelector('.profile-pic img');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

if (profilePic) {
  profilePic.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = profilePic.src;
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    resetZoom();
  });
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    resetZoom();
  }
});

// Lightbox for gallery images
const galleryImages = document.querySelectorAll('.gallery-item');
if (galleryImages && galleryImages.length) {
  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      resetZoom();
    });
  });
}

// Close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.style.display === 'block') {
    lightbox.style.display = 'none';
    resetZoom();
  }
});

// ------- Zoom & Pan for lightbox image -------
let zoomScale = 1;
let translateX = 0;
let translateY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;

function applyTransform() {
  lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
}

function resetZoom() {
  zoomScale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
  lightbox.classList.remove('zoomed');
}

// Wheel zoom (desktop)
lightboxImg.addEventListener('wheel', (e) => {
  if (lightbox.style.display !== 'block') return;
  e.preventDefault();
  const delta = -Math.sign(e.deltaY) * 0.2; // zoom in on wheel up
  const newScale = Math.min(4, Math.max(1, zoomScale + delta));
  const rect = lightboxImg.getBoundingClientRect();
  const cx = e.clientX - rect.left - rect.width / 2;
  const cy = e.clientY - rect.top - rect.height / 2;
  if (newScale !== zoomScale) {
    // Zoom towards cursor
    translateX -= (cx / zoomScale) * (newScale - zoomScale);
    translateY -= (cy / zoomScale) * (newScale - zoomScale);
    zoomScale = newScale;
    applyTransform();
  }
  if (zoomScale > 1) {
    lightbox.classList.add('zoomed');
  } else {
    lightbox.classList.remove('zoomed');
  }
}, { passive: false });

// Double-click/tap to toggle zoom
lightboxImg.addEventListener('dblclick', () => {
  if (zoomScale === 1) {
    zoomScale = 2.5;
    lightbox.classList.add('zoomed');
  } else {
    resetZoom();
    return;
  }
  applyTransform();
});

// Pan when zoomed
lightboxImg.addEventListener('mousedown', (e) => {
  if (zoomScale === 1) return;
  isPanning = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  lightbox.classList.add('dragging');
});

window.addEventListener('mousemove', (e) => {
  if (!isPanning) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  applyTransform();
});

window.addEventListener('mouseup', () => {
  isPanning = false;
  lightbox.classList.remove('dragging');
});

// Touch pinch-zoom and pan (basic)
let lastTouchDistance = 0;
lightboxImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    lastTouchDistance = getTouchDistance(e.touches[0], e.touches[1]);
  } else if (e.touches.length === 1 && zoomScale > 1) {
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
  }
}, { passive: false });

lightboxImg.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const current = getTouchDistance(e.touches[0], e.touches[1]);
    const delta = (current - lastTouchDistance) / 200; // scale factor
    const newScale = Math.min(4, Math.max(1, zoomScale + delta));
    zoomScale = newScale;
    lastTouchDistance = current;
    applyTransform();
    if (zoomScale > 1) lightbox.classList.add('zoomed'); else lightbox.classList.remove('zoomed');
  } else if (e.touches.length === 1 && zoomScale > 1) {
    e.preventDefault();
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    applyTransform();
  }
}, { passive: false });

function getTouchDistance(a, b) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

// Disable project buttons without valid links
document.addEventListener('DOMContentLoaded', () => {
  const projectButtons = document.querySelectorAll('.proj-actions a.btn');
  projectButtons.forEach((btn) => {
    const rawHref = btn.getAttribute('href');
    const isMissing = !rawHref || rawHref.trim() === '';
    const isPlaceholder = rawHref === '#' || /^javascript:\s*void\(0\)/i.test(rawHref || '');
    if (isMissing || isPlaceholder) {
      btn.classList.add('disabled');
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('tabindex', '-1');
      btn.removeAttribute('href');
      btn.addEventListener('click', (e) => e.preventDefault());
    }
  });
});
function updateDateTime() {
    const now = new Date();
  
    const options = {
      weekday: 'long',   // Monday, Tuesday
      year: 'numeric',
      month: 'long',     // September
      day: 'numeric'
    };
  
    const formatted = now.toLocaleDateString('en-US', options) +
                      " — " + now.toLocaleTimeString('en-US');
  
    document.querySelector('#date-time').textContent = formatted;
  }
  
  updateDateTime();
  setInterval(updateDateTime, 1000);
   // Dark Mode toggle
    const toggle = document.querySelector("#darkModeToggle");
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  