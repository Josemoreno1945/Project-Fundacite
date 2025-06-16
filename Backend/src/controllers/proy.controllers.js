import { getP, postP, getidP } from "../models/proy.model.js";

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

//------------------------------Post-----------------------------------------
export const postProyects = async (req, res) => {
  try {
    const data = req.body;
    console.log("Datos recibidos en el backend (req.body):", req.body);
    const result = await postP(data);
    res.json({ id: result[0].Proy_Id });
  } catch (error) {
    console.error("Error al guardar el documento:", error);
    res.status(500).send("Error al guardar el documento");
  }
};
