 // رابط الشيت المنشور كـ CSV
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSYXdIaILGp8PvbBCzK84pufhFZ6e4ypF-yrCrr1zuWNySYXyw47R0YNgdd1aoH9b30twajVf8FB_Mp/pub?gid=1437077973&single=true&output=csv";

    fetch(sheetUrl)
      .then(res => res.text())
      .then(csv => {
        const rows = csv.split("\n").slice(1); // تجاهل أول صف لو عناوين
        const container = document.getElementById("cards-container");

        rows.forEach(row => {
          const cols = row.split(",");
          if (cols.length >= 2) {
            const unit = cols[0].trim();
            const desc = cols[1].trim();

            if(unit && desc) {
              const card = document.createElement("div");
              card.className = "card";

              card.innerHTML = `
                <div class="unit-number">${unit}</div>
                <div class="description">${desc}</div>
              `;
              container.appendChild(card);
            }
          }
        });
      });