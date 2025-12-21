const apiUrl = "https://script.google.com/macros/s/AKfycbx51ejIg4-XwG-lBovDu-wOQhQ0TrVQg5pd3UmDfzLf4b7q7X8zDPj8EFOszYAzrcvU/exec";

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
setInterval(loadData, 2500); 