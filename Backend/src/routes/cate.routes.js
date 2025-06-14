import { Router } from "express";
import {
  getCategorias,
  postCategorias,
  putCategorias,
  deleteCategorias,
} from "../controllers/cate.controllers.js";
import multer from "multer";

const upload = multer();
const router = Router();

router.get("/categorias", getCategorias);
router.post("/categorias", upload.none(), postCategorias);
router.put("/categorias/:id", putCategorias);
router.delete("/categorias/:id", deleteCategorias);

export default router;
