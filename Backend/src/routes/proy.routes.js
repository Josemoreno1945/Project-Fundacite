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
  rechazarproyecto,
  getProyectsRech,
  getCountProyectsAp,
  getCountProyectsArch,
  getCountProyectsPen,
  getCountProyectsRech,
  check_titulo,
  FTitulAprobado,
  FTitulRechazado,
  FTitulPendiente,
  FTitulArchivado,
  rechazarConMotivo,
} from "../controllers/proy.controllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();
const upload = multer();

router.get("/proyectos", getProyects);

router.get("/proyectosA", getProyectsA);
router.get("/proyectosRechazados", getProyectsRech);

router.get("/proyectosArc", getProyectsArc);

router.get("/proyectos/:id", getidProyects);

router.post("/FTituloPendiente", verifyToken, isAdmin, FTitulPendiente);
router.post("/FTituloArchivado", verifyToken, isAdmin, FTitulArchivado);
router.post("/FTituloAprobado", verifyToken, FTitulAprobado);
router.post("/FTituloRechazado", verifyToken, isAdmin, FTitulRechazado);
router.post("/rechazarConMotivo", verifyToken, isAdmin, rechazarConMotivo);

router.post(
  "/proyectos",
  verifyToken,
  upload.array("images"),
  postProyectWithPdf
);

router.delete("/proyectos/:id", verifyToken, isAdmin, deleteProyectAndDoc);
router.put("/aprobar", verifyToken, isAdmin, aprobarproyecto);
router.put("/archivar", verifyToken, isAdmin, archivarproyecto);
router.put("/rechazar", verifyToken, isAdmin, rechazarproyecto);

router.get("/countRechazados", verifyToken, isAdmin, getCountProyectsRech);
router.get("/countArchivados", verifyToken, isAdmin, getCountProyectsArch);
router.get("/countPendientes", verifyToken, isAdmin, getCountProyectsPen);
router.get("/countAprobados", verifyToken, isAdmin, getCountProyectsAp);

router.get("/check_titulo/:titulo", check_titulo);

export default router;
