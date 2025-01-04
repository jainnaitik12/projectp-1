import html2pdf from "html2pdf.js";

export const generatePDF = async (elementId, profile) => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Resume element not found");

  const clone = element.cloneNode(true);
  clone.style.transform = "none";

  // Add specific styles for PDF generation
  const chips = clone.querySelectorAll(".MuiChip-root");
  chips.forEach((chip) => {
    chip.style.display = "inline-flex";
    chip.style.alignItems = "center";
    chip.style.justifyContent = "center";
    chip.style.height = "28px";
    chip.style.padding = "0";
    chip.style.boxSizing = "border-box";
  });

  const chipLabels = clone.querySelectorAll(".MuiChip-label");
  chipLabels.forEach((label) => {
    label.style.padding = "0 12px";
    label.style.lineHeight = "28px";
    label.style.display = "inline-flex";
    label.style.alignItems = "center";
    label.style.justifyContent = "center";
  });

  document.body.appendChild(clone);

  try {
    const opt = {
      margin: -5,
      filename: `${profile.personalInfo.name}_resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    await html2pdf().set(opt).from(clone).save();
  } finally {
    document.body.removeChild(clone);
  }
};

//size in mb's but 1 less page |
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export const generatePDF = async (elementId, profile) => {
//   const element = document.getElementById(elementId);
//   if (!element) throw new Error("Resume element not found");

//   const clone = element.cloneNode(true);
//   Object.assign(clone.style, {
//     height: "1123px",
//     width: "794px",
//     overflow: "hidden",
//   });
//   document.body.appendChild(clone);

//   try {
//     const canvas = await html2canvas(clone, {
//       scale: 3,
//       useCORS: true,
//       logging: false,
//     });
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgData = canvas.toDataURL("image/png");

//     const pdfWidth = 210; // A4 width in mm
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${profile.personalInfo.name}_resume.pdf`);
//   } finally {
//     document.body.removeChild(clone);
//   }
// };
