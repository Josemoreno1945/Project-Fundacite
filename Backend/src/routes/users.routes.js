import { Router } from "express";
import {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  login,
  register,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import multer from "multer";
const upload = multer();

const router = Router();

//---------------------------------Get---------------------------------------
router.get("/users", verifyToken, getUsers);

router.post("/users", verifyToken, isAdmin, upload.none(), postUsers);

router.put("/users/:id", verifyToken, isAdmin, putUsers);

router.delete("/users/:id", verifyToken, isAdmin, deleteUsers);

router.post("/login", verifyToken, login);

router.post("/register", register);

export default router;
