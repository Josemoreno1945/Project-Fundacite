import { getP, postP, getidP, putProy, getPA } from "../models/proy.model.js";
import { postDoc } from "../models/doc.model.js";
import { uploadBuffer } from "../services/icedrive.js";
import PDFDocument from "pdfkit";

//---------------------------------Get---------------------------------------
export const getProyects = async (req, res) => {
  try {
    const rows = await getP();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    res.status(500).send("Error obteniendo proyectos");
  }
};

//---------------------------------Get---------------------------------------
export const getidProyects = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await getidP(id);
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    res.status(500).send("Error obteniendo proyectos");
  }
};

export const aprobarproyecto = async (req, res) => {
  try {
    const data = req.body;
    const rows = await putProy(data);
    res.json(rows);
  } catch (error) {
    console.error("Error actualizando proyectos:", error);
    res.status(500).send("Error actualizandoproyectos");
  }
};

export const getProyectsA = async (req, res) => {
  try {
    const rows = await getPA();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    res.status(500).send("Error obteniendo proyectos");
  }
};

//------------------------------Post-----------------------------------------
//---------------------------------------------------------------------------
export const postProyectWithPdf = async (req, res) => {
  try {
    const files = req.files || [];
    const body = req.body || {};

    // 1) crear proyecto en BD-----------
    const result = await postP(body);
    const proyectoId =
      result?.Proy_Id ||
      result?.id ||
      (Array.isArray(result) && result[0]?.Proy_Id);
    if (!proyectoId) {
      console.error("postP no retornó ID:", result);
      return res
        .status(500)
        .json({ error: "No se obtuvo ID del proyecto", detail: result });
    }

    // 2) generar PDF en memoria
    const pdfDoc = new PDFDocument({ autoFirstPage: false });
    const buffers = [];
    pdfDoc.on("data", (chunk) => buffers.push(chunk));
    pdfDoc.on("end", async () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);
        const remotePdfPath = `proyectos/${body.Proy_Titul}_${Date.now()}.pdf`;
        // Subir a Icedrive
        await uploadBuffer(pdfBuffer, remotePdfPath);
        // Guardar registro en BD
        const docRecord = await postDoc(
          {
            Doc_NomArc: `${body.Proy_Titul || "final"}_${proyectoId}.pdf`,
            Doc_TiArId: 2,
            Doc_ProyId: proyectoId,
          },
          remotePdfPath
        );

        return res.json({
          ok: true,
          proyectoId,
          pdf: remotePdfPath,
          doc: docRecord,
          Message: "Proyecto creado y PDF subido",
        });
      } catch (err) {
        console.error("Error subiendo PDF o guardando doc:", err);
        return res
          .status(500)
          .json({ error: "Error subiendo PDF", detail: err.message });
      }
    });

    // llenar PDF con imágenes
    if (files.length === 0) {
      pdfDoc.addPage();
      pdfDoc.fontSize(12).text("Proyecto sin imágenes", 100, 100);
    } else {
      for (const file of files) {
        try {
          pdfDoc.addPage({ size: "A4", margin: 40 });
          pdfDoc.image(file.buffer, {
            fit: [500, 700],
            align: "center",
            valign: "center",
          });
        } catch (e) {
          console.warn(
            "Imagen no procesada en PDF:",
            file.originalname,
            e.message
          );
        }
      }
    }

    pdfDoc.end();
  } catch (err) {
    console.error("Error en postProyectWithPdf:", err);
    res
      .status(500)
      .json({ error: "Error creando proyecto y PDF", detail: err.message });
  }
};
