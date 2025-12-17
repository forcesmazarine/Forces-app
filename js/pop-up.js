let currentType = "";
let unitsData = [];
let twinSide = "";

// ربط الأزرار
document.querySelectorAll(".owner-grid button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentType = btn.dataset.type;
    openPopup();
    loadJSON();
  });
});

function openPopup() {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("popupTitle").textContent =
    `بحث في ${currentType.toUpperCase()}`;

  hideAllInputs();
  document.getElementById("result").textContent = "";
  twinSide = "";

  if (currentType === "villa" || currentType === "island") {
    document.getElementById("simpleInput").classList.remove("hidden");
  }

  if (currentType === "twin") {
    document.getElementById("twinInput").classList.remove("hidden");
  }

  if (currentType === "chalet") {
    document.getElementById("chaletInput").classList.remove("hidden");
  }
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function hideAllInputs() {
  document.querySelectorAll(".input-group").forEach(div => {
    div.classList.add("hidden");
  });
}

// اختيار A أو B
function setTwinSide(side) {
  twinSide = side;
  document.getElementById("twinSelected").textContent =
    `تم اختيار ${side}`;
}

// تحميل JSON
function loadJSON() {
  fetch(`${currentType}.json`)
    .then(res => res.json())
    .then(data => unitsData = data);
}

// البحث
function searchUnit() {
  let unitNumber = "";

  if (currentType === "villa" || currentType === "island") {
    unitNumber = document.getElementById("simpleUnit").value;
  }

  if (currentType === "twin") {
    const number = document.getElementById("twinUnit").value;
    if (!number || !twinSide) {
      alert("ادخل الرقم واختار A أو B");
      return;
    }
    unitNumber = `${number}-${twinSide}`;
  }

  if (currentType === "chalet") {
    const building = document.getElementById("chaletBuilding").value;
    const apartment = document.getElementById("chaletApartment").value;

    if (!building || !apartment) {
      alert("ادخل رقم الشاليه والشقة");
      return;
    }
    unitNumber = `${building}-${apartment}`;
  }

  const unit = unitsData.find(u => u.unitNumber === unitNumber);
  const result = document.getElementById("result");

  if (unit) {
    result.innerHTML = unit.owners.join("<br>");
  } else {
    result.textContent = "الوحدة غير موجودة";
  }
}
