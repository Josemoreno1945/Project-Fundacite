import { Router } from "express";
import {
  getProyectsA,
  postProyectsA,
  getidProyectsA,
} from "../controllers/proyA.controllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();
const upload = multer();

router.get("/proyectos", getProyectsA);

router.get("/proyectos/:id", getidProyectsA);

router.post("/proyectos", verifyToken, upload.none(), postProyectsA);

export default router;
