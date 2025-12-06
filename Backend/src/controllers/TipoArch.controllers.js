import { getTa, postTa, putTa } from "../models/TipoArch.model.js";
import tipo_aSchema from "../schemas/tipo_archivos.js";
import { errors, throwError } from "../utils/errors.js";

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
export const posttipoArc = async (req, res, next) => {
  try {
    const data = req.body;
    const parseU = tipo_aSchema.safeParse(data);
    if (!data.TipA_Nombr) {
      throwError(errors.missingFields);
    }
    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }
    const rows = await postTa(data);
    return res.json({ rows, message: "Tipo de archivo registrado con exito" });
  } catch (error) {
    next(error);
  }
};

//--------------------------------Put----------------------------------------
export const puttipoArch = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const rows = await putTa(id, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
