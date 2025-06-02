import { Router } from "express";
import { getTipoArch } from "../controllers/TipoArch.controllers.js";




const router=Router()


router.get('/tipoArchivos',getTipoArch)




export default router;