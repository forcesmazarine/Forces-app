const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrllDJVT8xn4IQYLLPpoPefr-rDCVbaFpbH4W-P7VCPXX4GZPnFEnxTZkcDkFL9b30bO1pwFErT_7E/pub?gid=2026294641&single=true&output=csv";

async function loadUnits() {
  const response = await fetch(sheetUrl);
  const data = await response.text();

  const rows = data.split("\n").slice(1); // تجاهل الهيدر
  const tbody = document.querySelector("#units tbody");
  tbody.innerHTML = "";

  rows.forEach(row => {
    if (!row.trim()) return;

    // مهم: التعامل مع الفواصل داخل النص
    const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const unitNumber = cols[0]?.replace(/"/g, "");
    const delegateName = cols[1]?.replace(/"/g, "");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${unitNumber}</td>
      <td>${delegateName}</td>
    `;

    tbody.appendChild(tr);
  });
}

loadUnits();
setInterval(loadUnits, 30 * 60 * 1000); // تحديث كل 30 دقيقة
