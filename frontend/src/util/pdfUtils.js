import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export const generatePdfFromElement = async (
  element,
  fileName = "invoice.pdf",
  returnBlob = false
) => {
  if (!element) throw new Error("Element not found");

  const imgData = await toPng(element, {
    cacheBust: true,
    backgroundColor: "#ffffff",
    pixelRatio: 2,
  });

  const pdf = new jsPDF("p", "pt", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);

  // scale image to fit BOTH width and height
  const scale = Math.min(
    pageWidth / imgProps.width,
    pageHeight / imgProps.height
  );

  const imgWidth = imgProps.width * scale;
  const imgHeight = imgProps.height * scale;

  // center the image on the page
  const x = (pageWidth - imgWidth) / 2;
  const y = (pageHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

  if (returnBlob) {
    return pdf.output("blob");
  } else {
    pdf.save(fileName);
  }
};
