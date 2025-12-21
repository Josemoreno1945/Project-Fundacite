import {
  getCat,
  postCat,
  putCat,
  deleteCat,
  FiltroNombre_cat,
  getCategoriabyNombre,
} from "../models/cate.model.js";
import CategoriasSchema from "../schemas/categorias.schemas.js";

import { errors, throwError } from "../utils/errors.js";

//---------------------------------Filtro------------------------------------
export const FNombre_cat = async (req, res, next) => {
  try {
    const data = req.body;
    const rows = await FiltroNombre_cat(data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//---------------------------------Get nombre---------------------------------------
export const getCatbyNombre = async (req, res, next) => {
  try {
    const nombre = req.params.nombre;
    const rows = await getCategoriabyNombre(nombre);
    return res.json({ exists: !!rows });
  } catch (error) {
    next(error);
  }
};

//---------------------------------Get---------------------------------------
export const getCategorias = async (req, res, next) => {
  try {
    const rows = await getCat();
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//---------------------------------Post---------------------------------------
export const postCategorias = async (req, res, next) => {
  try {
    const data = req.body;
    const parseU = CategoriasSchema.safeParse(data);
    if (!data.Cate_NomCa && !data.Cate_Descr) {
      throwError(errors.missingFields);
    }
    const NombreExist = await getCategoriabyNombre(data.Cate_NomCa);
    if (NombreExist) {
      throwError(errors.NombreCategoriaDuplicated);
    }

    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }
    const rows = await postCat(data);
    return res.json({ rows, message: "Categoria registrada con exito" });
  } catch (error) {
    next(error);
  }
};

//--------------------------------Put----------------------------------------
export const putCategorias = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const parseU = CategoriasSchema.safeParse(data);
    if (!data.Cate_NomCa && !data.Cate_Descr) {
      throwError(errors.missingFields);
    }
    const NombreExist = await getCategoriabyNombre(data.Cate_NomCa);
    if (NombreExist) {
      throwError(errors.NombreCategoriaDuplicated);
    }
    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }
    const rows = await putCat(id, data);
    return res.json({ rows, message: "Categoria editada con exito" });
  } catch (error) {
    next(error);
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
