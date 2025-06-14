import { Router } from "express";
import {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} from "../controllers/users.controllers.js";
import multer from "multer";
const upload = multer();

const router = Router();

//---------------------------------Get---------------------------------------
router.get("/users", getUsers);

router.post("/users", upload.none(), postUsers);

router.put("/users/:id", putUsers);

router.delete("/users/:id", deleteUsers);
export default router;
