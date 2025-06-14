import { Router } from "express";
import {
  getTipoArch,
  posttipoArc,
  puttipoArch,
} from "../controllers/TipoArch.controllers.js";
import multer from "multer";

const upload = multer();
const router = Router();

router.get("/tipoArchivos", getTipoArch);
router.post("/tipoArchivos", upload.none(), posttipoArc);
router.put("/tipoArchivos/:id", puttipoArch);

export default router;
