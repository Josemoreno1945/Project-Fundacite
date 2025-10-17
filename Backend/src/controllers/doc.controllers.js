import { getDoc, postDoc } from "../models/doc.model.js";
import { getPdfByProyId } from "../models/doc.model.js";
import { downloadStream } from "../services/icedrive.js";
//-------------------------------Post-----------------------------------------
export const postDocuments = async (req, res) => {
  try {
    const imagenPath = `/uploads/${req.file.filename}`;
    const { Doc_TiArId, Doc_ProyId } = req.body;
    const Doc_NomArc = req.file.filename;

    const result = await postDoc(
      { Doc_NomArc, Doc_TiArId, Doc_ProyId },
      imagenPath
    );
    res.json(result);
  } catch (error) {
    console.error("Error al guardar el documento:", error);
    res.status(500).send("Error al guardar el documento");
  }
};

//---------------------------------Get---------------------------------------
export const getDocuments = async (req, res) => {
  try {
    const rows = await getDoc();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo documentos:", error);
    res.status(500).send("Error obteniendo documentos");
  }
};

//--------------------------------------------------------------------
export const downloadPdfByProy = async (req, res) => {
  try {
    const proyId = req.params.proyId;
    const doc = await getPdfByProyId(proyId);
    if (!doc)
      return res
        .status(404)
        .json({ error: "PDF no encontrado para este proyecto" });

    const remotePath = doc.Doc_RutaAr;
    const stream = await downloadStream(remotePath); // debe devolver readable stream

    const filename = (doc.Doc_NomArc || `proyecto_${proyId}.pdf`)
      .toString()
      .replace(/["'\\]/g, "");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(
        filename
      )}`
    );

    stream.on("error", (err) => {
      console.error("Error streaming desde pCloud:", err);
      if (!res.headersSent)
        res.status(500).json({ error: "Error descargando PDF" });
    });

    stream.pipe(res);
  } catch (err) {
    console.error("downloadPdfByProy error:", err);
    res
      .status(500)
      .json({ error: "Error interno al descargar PDF", detail: err.message });
  }
};
