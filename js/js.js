// Sites Daily att 
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}
// رابط الشيت المنشور كـ CSV
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSYXdIaILGp8PvbBCzK84pufhFZ6e4ypF-yrCrr1zuWNySYXyw47R0YNgdd1aoH9b30twajVf8FB_Mp/pub?gid=0&single=true&output=csv";

fetch(sheetUrl)
    .then(res => res.text())
    .then(csv => {
        const rows = csv.split("\n").map(r => r.split(","));
        const tbody = document.querySelector("#data-table tbody");

        rows.slice(1).forEach(row => { // تجاهل العناوين
            if (row.length > 1) {
                const tr = document.createElement("tr");
                row.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            }
        });
    });
// login page 
const allowedIDs = ["123", "456", "789", "admin"];
function login() {
    const userId = document.getElementById("userId").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (allowedIDs.includes(userId)) {
        window.location.href = "homepage.html"; // لو صحيح يدخل على الصفحة
    } else {
        errorMsg.style.display = "block"; // لو غلط يظهر رسالة
    }
}
let lastScrollY = window.scrollY;
  const tabs = document.querySelector('.tabs');

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

  