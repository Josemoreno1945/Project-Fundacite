import { getMisProyectos } from "../models/MisProyectos.model.js";

export const MisProyectos = async (req, res, next) => {
  try {
    const data = req.body;
    const rows = await getMisProyectos(data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
