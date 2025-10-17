import { Router } from "express";
import {
  getProyects,
  getidProyects,
  aprobarproyecto,
  archivarproyecto,
  getProyectsA,
  postProyectWithPdf,
  deleteProyectAndDoc,
  getProyectsArc,
} from "../controllers/proy.controllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();
const upload = multer();

router.get("/proyectos", getProyects);

router.get("/proyectosA", getProyectsA);

router.get("/proyectosArc", getProyectsArc);

router.get("/proyectos/:id", getidProyects);

router.post(
  "/proyectos",
  verifyToken,
  upload.array("images"),
  postProyectWithPdf
);

router.delete("/proyectos/:id", verifyToken, isAdmin, deleteProyectAndDoc);
router.put("/aprobar", verifyToken, isAdmin, aprobarproyecto);
router.put("/archivar", verifyToken, isAdmin, archivarproyecto);

export default router;
