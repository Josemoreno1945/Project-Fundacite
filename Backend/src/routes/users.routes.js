import { Router } from "express";
import { getUsers, postUsers } from "../controllers/users.controllers.js";
import multer from "multer";
const upload = multer();

const router = Router();

//---------------------------------Get---------------------------------------
router.get("/users", getUsers);

router.post("/users", upload.none(), postUsers);

export default router;
