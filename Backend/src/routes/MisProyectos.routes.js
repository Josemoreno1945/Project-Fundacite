import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";
import { MisProyectos } from "../controllers/MisProyectos.controllers.js";

const router = Router();
const upload = multer();

router.post("/MisProyectos", verifyToken, MisProyectos);

export default router;
