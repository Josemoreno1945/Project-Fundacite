import {
  getP,
  postP,
  getidP,
  putProy,
  getPA,
  deleteProyById,
  putProy_archivado,
  putProy_rechazado,
  getArch,
  getRech,
} from "../models/proy.model.js";
import { getPdfByProyId, deleteDocsByProyId } from "../models/doc.model.js";
import { postDoc } from "../models/doc.model.js";
import proyectoSchema from "../schemas/proyecto.schemas.js";
import { errors, throwError } from "../utils/errors.js";
import { uploadBuffer, deleteRemotePath } from "../services/icedrive.js";
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

export const rechazarproyecto = async (req, res) => {
  try {
    const data = req.body;
    const rows = await putProy_rechazado(data);
    res.json(rows);
  } catch (error) {
    console.error("Error actualizando proyectos:", error);
    res.status(500).send("Error actualizandoproyectos");
  }
};

export const archivarproyecto = async (req, res) => {
  try {
    const data = req.body;
    const rows = await putProy_archivado(data);
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

export const getProyectsArc = async (req, res) => {
  try {
    const rows = await getArch();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    res.status(500).send("Error obteniendo proyectos");
  }
};

export const getProyectsRech = async (req, res) => {
  try {
    const rows = await getRech();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    res.status(500).send("Error obteniendo proyectos");
  }
};

//------------------------------Post-----------------------------------------
//---------------------------------------------------------------------------
export const postProyectWithPdf = async (req, res, next) => {
  try {
    const files = req.files || [];
    const body = req.body || {};
    if (
      !body.Proy_Titul &&
      !body.Proy_Descr &&
      !body.Proy_Resum &&
      !body.Proy_NomAu
    ) {
      throwError(errors.missingFields);
    }
    const parseU = proyectoSchema.safeParse(body);

    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }

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
        const remotePdfPath = `proyectos/${body.Proy_Titul}_${
          body.Proy_Id
        }_${Date.now()}.pdf`;
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
    next(err);
  }
};

//delete --------------------------------------------------------------
export const deleteProyectAndDoc = async (req, res) => {
  const proyId = req.params.id;
  try {
    // 1) obtener documento (si existe)
    const doc = await getPdfByProyId(proyId);

    // 2) si hay doc remoto, intentar borrarlo primero
    if (doc && doc.Doc_RutaAr) {
      try {
        await deleteRemotePath(doc.Doc_RutaAr);
      } catch (err) {
        console.error("Error borrando archivo remoto:", err.message || err);
        return res.status(500).json({
          error: "Error borrando archivo remoto",
          detail: err.message,
        });
      }
    }

    // 3) borrar registros de documentos en BD
    await deleteDocsByProyId(proyId);

    // 4) borrar el proyecto
    const deletedProject = await deleteProyById(proyId);
    if (!deletedProject)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    return res.json({ ok: true, message: "Proyecto y documentos eliminados" });
  } catch (err) {
    console.error("deleteProyectAndDoc error:", err);
    return res
      .status(500)
      .json({ error: "Error eliminando proyecto", detail: err.message });
  }
};
