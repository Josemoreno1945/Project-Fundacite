import { Router } from "express";
import multer from "multer";
import { getDocuments, postDocuments } from "../controllers/doc.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { generatePdfDownload } from "../controllers/pdf.controllers.js";

const router = Router();
const upload = multer();

router.get("/documentos", getDocuments);
router.post(
  "/documentos/generate-pdf",
  upload.array("images"),
  generatePdfDownload
);
router.post(
  "/documentos",
  verifyToken,
  upload.single("Doc_RutaAr"),
  postDocuments
);

export default router;
