import { Router } from "express";
import { getProyects, postProyects } from "../controllers/proy.controllers.js";
import multer from 'multer';

const router=Router()
const upload = multer(); 

router.get('/proyectos',getProyects)

router.post('/proyectos',upload.none(),postProyects )


export default router;