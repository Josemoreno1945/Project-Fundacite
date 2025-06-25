import { Router } from "express";
import { getDocuments, postDocuments } from "../controllers/doc.controllers.js";

import upload from "../middlewares/subida.js";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/documentos", getDocuments);

router.post(
  "/documentos",
  verifyToken,
  isAdmin,
  upload.single("Doc_RutaAr"),
  postDocuments
);

export default router;
