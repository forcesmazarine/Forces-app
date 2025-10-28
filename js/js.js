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
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popup = document.getElementById("popupMenu");
const overlay = document.getElementById("overlay");

// تأكد إن العناصر موجودة قبل إضافة الأحداث
if (openPopup && closePopup && popup && overlay) {
  openPopup.addEventListener("click", () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// 🔹 دالة الانتقال للصفحات
function goToPage(url) {
  window.location.href = url;
}
