/* ==========================================================================
   BADGES.JS — Badge image popup modal
   ========================================================================== */

(function () {
  'use strict';

  const modal   = document.getElementById('fullImgBox');
  const fullImg = document.getElementById('fullImg');
  const desc    = document.getElementById('imgDesc');
  const closeBtn = document.getElementById('badgeClose');

  function openFullImg(src, descText) {
    if (!modal) return;
    fullImg.src = src;
    desc.textContent = descText || '';
    modal.classList.add('active');
  }

  function closeFullImg() {
    modal?.classList.remove('active');
    fullImg.src = '';
  }

  // Close on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeFullImg();
  });

  closeBtn?.addEventListener('click', closeFullImg);

  // Expose globally for inline onclick
  window.openFullImg  = openFullImg;
  window.closeFullImg = closeFullImg;

})();
