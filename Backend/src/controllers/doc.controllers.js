import { getDoc, postDoc } from "../models/doc.model.js";

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
