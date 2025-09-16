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
  });
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

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
  