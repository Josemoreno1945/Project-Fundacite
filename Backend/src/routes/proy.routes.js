import { Router } from "express";
import {
  getProyects,
  postProyects,
  getidProyects,
} from "../controllers/proy.controllers.js";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/proyectos", getProyects);

router.get("/proyectos/:id", getidProyects);

router.post("/proyectos", upload.none(), postProyects);

export default router;
