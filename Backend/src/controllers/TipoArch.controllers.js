import { getTa, postTa, putTa } from "../models/TipoArch.model.js";

//---------------------------------Get---------------------------------------
export const getTipoArch = async (req, res) => {
  try {
    const rows = await getTa();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo tipos:", error);
    res.status(500).send("Error obteniendo tipos");
  }
};

//---------------------------------Post---------------------------------------
export const posttipoArc = async (req, res) => {
  try {
    const data = req.body;
    const rows = await postTa(data);
    res.json(rows);
  } catch (error) {
    console.error("Error enviando tipo de archivo:", error);
    res.status(500).send("Error enviando tipo de archivo");
  }
};

//--------------------------------Put----------------------------------------
export const puttipoArch = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const rows = await putTa(id, data);
    res.json(rows);
  } catch (error) {
    console.error("Error actualizando tipo de archivo:", error);
    res.status(500).send("Error actualizando tipo de archivo");
  }
};
