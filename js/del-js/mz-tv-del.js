const apiUrl = "https://script.google.com/macros/s/AKfycbz-M9pIGtoNPkY60NGTxpoccW9hGvf-kNOnhuALYNieIPy-t_wtrGep328PMfCgee-C/exec";

async function loadData() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  const tbody = document.querySelector("#permits tbody");
  tbody.innerHTML = "";

  const today = new Date();

  data.forEach(item => {
    const tr = document.createElement("tr");

    // معالجة التاريخ
    const endDate = new Date(item.end);
    if (endDate < today) {
      tr.classList.add("expired");
    }

    tr.innerHTML = `
      <td>${item.unit}</td>
      <td>${item.desc}</td>
      <td>${item.start}</td>
      <td>${item.end}</td>
    `;

    tbody.appendChild(tr);
  });
}

loadData();
setInterval(loadData,60000); 