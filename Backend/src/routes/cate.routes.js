import { Router } from "express";
import {
  getCategorias,
  postCategorias,
  putCategorias,
  deleteCategorias,
  FNombre_cat,
  getCatbyNombre,
} from "../controllers/cate.controllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const upload = multer();
const router = Router();

router.post("/FNombrecat", verifyToken, isAdmin, FNombre_cat);
router.get("/categorias", getCategorias);
router.get("/categoriasbyNombre", verifyToken, isAdmin, getCatbyNombre);
router.post("/categorias", upload.none(), postCategorias);
router.put("/categorias/:id", putCategorias);
router.delete("/categorias/:id", deleteCategorias);

export default router;
