// 🔹 إخفاء وإظهار التابات أثناء التمرير
let lastScrollY = window.scrollY;
const tabs = document.querySelector('.tabs');

if (tabs) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // نازل لتحت → اخفي التابات
      tabs.classList.add('hidden');
    } else {
      // طالع لفوق → أظهر التابات
      tabs.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });
}

// 🔹 التحكم فى المربع الحواري (Popup)
function setupPopup(openId, closeId, popupId, overlayId) {
  const openBtn = document.getElementById(openId);
  const closeBtn = document.getElementById(closeId);
  const popup = document.getElementById(popupId);
  const overlay = document.getElementById(overlayId);

  openBtn.addEventListener("click", () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });
}

setupPopup("openPopup1", "closePopup1", "popup1", "overlay1");
setupPopup("openPopup2", "closePopup2", "popup2", "overlay2");

function goToPage(page) {
  window.location.href = page;
}