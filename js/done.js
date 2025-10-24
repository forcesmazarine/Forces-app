// ⬇️ دالة توليد وحفظ ومشاركة الـ PDF
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const report = document.getElementById("report");
  const imagesInput = document.getElementById("images");

  // ✅ خانة الاسم لو مش موجودة
  let nameContainer = document.getElementById("memoNameContainer");
  if (!nameContainer) {
    nameContainer = document.createElement("div");
    nameContainer.id = "memoNameContainer";
    nameContainer.style.textAlign = "center";
    nameContainer.style.marginTop = "20px";

    const label = document.createElement("label");
    label.textContent = "الرجاء إضافة اسم المذكرة:";
    label.style.display = "block";
    label.style.marginBottom = "8px";
    label.style.fontWeight = "bold";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "memoName";
    input.placeholder = "اكتب اسم المذكرة هنا...";
    input.style.padding = "8px";
    input.style.width = "80%";
    input.style.borderRadius = "8px";
    input.style.border = "1px solid #888";
    input.style.fontSize = "16px";
    input.style.textAlign = "center";

    nameContainer.appendChild(label);
    nameContainer.appendChild(input);
    document.querySelector(".actions").appendChild(nameContainer);

    nameContainer.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // 🧾 اسم الملف
  const memoNameInput = document.getElementById("memoName");
  const memoName = memoNameInput?.value?.trim() || "Security_Report";

  // 🗓️ إضافة التاريخ تلقائيًا لو فاضي
  const desc1 = document.getElementById("description1");
  if (desc1 && desc1.innerText.trim() === "") {
    const now = new Date();
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const todayName = days[now.getDay()];
    const dateString = now.toLocaleDateString("ar-EG");
    const introText = `بتاريخ : ${dateString} الموافق : ${todayName}\n\n`;
    desc1.innerText = introText;
  }

  // 🖼️ تحويل التقرير لصورة
  const canvas = await html2canvas(report, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // 📸 إضافة الصور المرفقة
  const files = imagesInput?.files;
  if (files && files.length > 0) {
    for (let file of files) {
      const imgURL = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve) => {
        img.onload = () => {
          pdf.addPage();

          const pageW = 210;
          const pageH = 297;
          const ratio = Math.min(pageW / img.width, pageH / img.height);
          const displayWidth = img.width * ratio;
          const displayHeight = img.height * ratio;
          const x = (pageW - displayWidth) / 2;
          const y = (pageH - displayHeight) / 2;

          pdf.addImage(img, "JPEG", x, y, displayWidth, displayHeight);
          URL.revokeObjectURL(imgURL);
          resolve();
        };
        img.src = imgURL;
      });
    }
  }

  const fileName = `${memoName}.pdf`;
  const pdfBlob = pdf.output("blob");
  const file = new File([pdfBlob], fileName, { type: "application/pdf" });

  // 💾 أولًا نحفظ الملف على الجهاز
  pdf.save(fileName);

  // 📤 ثم نعرض قائمة المشاركة (بعد الحفظ بثانية صغيرة)
  setTimeout(async () => {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: memoName,
          text: "📄 تقرير الأمن اليومي",
          files: [file],
        });
        console.log("✅ تمت المشاركة بنجاح");
      } catch (err) {
        console.warn("❌ المشاركة ألغيت:", err);
      }
    } else {
      console.log("📎 المشاركة غير مدعومة على هذا الجهاز.");
    }
  }, 800); // مهلة بسيطة عشان الحفظ يتم الأول
}
