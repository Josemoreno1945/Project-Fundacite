import { Router } from "express";
import { getDocuments, postDocuments } from "../controllers/doc.controllers.js";

import upload from "../middlewares/subida.js";

const router = Router();

router.get("/documentos", getDocuments);

router.post("/documentos", upload.single("Doc_RutaAr"), postDocuments);

export default router;
