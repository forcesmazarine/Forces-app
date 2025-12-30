fetch("https://script.google.com/macros/s/AKfycbz7vCXjgUKDidRtn6WNyvg1MaBme21szgiqQCqICg9caRXyQ2Dshcg7YQPOnQumIWaf/exec")
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("units");

    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.unitNumber}</td>
        <td>${item.delegateName}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error(err));