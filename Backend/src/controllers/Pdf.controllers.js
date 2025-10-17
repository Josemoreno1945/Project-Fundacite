import PDFDocument from "pdfkit";

export const generatePdfDownload = async (req, res) => {
  try {
    const files = req.files || [];
    const doc = new PDFDocument({ autoFirstPage: false });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => {
      const pdfBuf = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="Proyecto_${Date.now()}.pdf"`
      );
      res.send(pdfBuf);
    });

    if (files.length === 0) {
      doc.addPage();
      doc.fontSize(12).text("No hay imágenes para generar PDF", 100, 100);
    } else {
      for (const file of files) {
        try {
          doc.addPage({ size: "A4", margin: 40 });
          doc.image(file.buffer, {
            fit: [500, 700],
            align: "center",
            valign: "center",
          });
        } catch (e) {
          // imagen no válida -> ignorar
        }
      }
    }

    doc.end();
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Error generando PDF" });
  }
};
