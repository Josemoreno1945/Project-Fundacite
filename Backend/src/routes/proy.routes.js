import { Router } from "express";
import {
  getProyects,
  getidProyects,
  aprobarproyecto,
  getProyectsA,
  postProyectWithPdf,
} from "../controllers/proy.controllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();
const upload = multer();

router.get("/proyectos", getProyects);

router.get("/proyectosA", getProyectsA);

router.get("/proyectos/:id", getidProyects);

router.post(
  "/proyectos",
  verifyToken,
  upload.array("images"),
  postProyectWithPdf
);

router.put("/aprobar", verifyToken, isAdmin, aprobarproyecto);

export default router;
