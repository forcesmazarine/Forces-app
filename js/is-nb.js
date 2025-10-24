const API_URL = "https://script.google.com/macros/s/PUT_YOUR_DEPLOYMENT_URL_HERE/exec";

async function uploadImage() {
  const point = document.getElementById("point").value;
  const fileInput = document.getElementById("file");
  const status = document.getElementById("status");
  if (!point) return status.textContent = "⚠️ اختر النقطة أولاً";
  if (!fileInput.files.length) return status.textContent = "⚠️ اختر صورة";

  status.textContent = "⏳ جارٍ الرفع...";

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Data = e.target.result.split(",")[1];
    const body = JSON.stringify({
      pointName: point,
      fileName: file.name,
      fileData: base64Data
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      });
      const data = await res.json();
      status.textContent = data.message || "تم الرفع";
      fileInput.value = "";
    } catch (err) {
      status.textContent = "❌ خطأ في الاتصال بالسيرفر";
    }
  };
  reader.readAsDataURL(file);
}