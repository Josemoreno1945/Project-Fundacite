import { getCat, postCat, putCat, deleteCat } from "../models/cate.model.js";

//---------------------------------Get---------------------------------------
export const getCategorias = async (req, res) => {
  try {
    const rows = await getCat();
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo categorias:", error);
    res.status(500).send("Error obteniendo categorias");
  }
};

//---------------------------------Post---------------------------------------
export const postCategorias = async (req, res) => {
  try {
    const data = req.body;
    const rows = await postCat(data);
    res.json(rows);
  } catch (error) {
    console.error("Error enviando categorias:", error);
    res.status(500).send("Error enviando categorias");
  }
};

//--------------------------------Put----------------------------------------
export const putCategorias = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const rows = await putCat(id, data);
    res.json(rows);
  } catch (error) {
    console.error("Error actualizando categorias:", error);
    res.status(500).send("Error actualizando categorias");
  }
};

//-------------------------------Delete-----------------------------------------

export const deleteCategorias = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await deleteCat(id);

    if (rows === 0) {
      return res.status(404).json({ message: "categoria no encontrada" });
    } else {
      return res.json({ message: "categoria eliminada" });
    }
  } catch (error) {
    console.error("Error obteniendo categoria:", error);
    res.status(500).send("Error obteniendo categoria");
  }
};
