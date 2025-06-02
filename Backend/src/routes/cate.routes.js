import { Router } from "express";
import { getCategorias } from "../controllers/cate.controllers.js";



const router=Router()


router.get('/categorias',getCategorias)




export default router;