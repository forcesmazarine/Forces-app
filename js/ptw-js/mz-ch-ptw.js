 const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrllDJVT8xn4IQYLLPpoPefr-rDCVbaFpbH4W-P7VCPXX4GZPnFEnxTZkcDkFL9b30bO1pwFErT_7E/pub?gid=1733249476&single=true&output=csv";

    async function loadData() {
      const response = await fetch(sheetUrl);
      const data = await response.text();
      const rows = data.split("\n").slice(1); // تجاهل العناوين

      const tbody = document.querySelector("#permits tbody");
      tbody.innerHTML = "";

      rows.forEach(row => {
        if (row.trim() === "") return;
        const cols = row.split(",");
        const unit = cols[0];
        const desc = cols[1];
        const start = cols[2];
        const end = cols[3];

        // معالجة التاريخ
        const [day, month, year] = end.split("/").map(x => parseInt(x));
        const endDate = new Date(year, month - 1, day);
        const today = new Date();

        // إنشاء صف
        const tr = document.createElement("tr");
        if (endDate < today) {
          tr.classList.add("expired");
        }

        tr.innerHTML = `
          <td>${unit}</td>
          <td>${desc}</td>
          <td>${start}</td>
          <td>${end}</td>
        `;

        tbody.appendChild(tr);
      });
    }

    loadData();
    setInterval(loadData, 60000); // تحديث كل 30 ثانية