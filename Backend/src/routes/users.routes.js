import { Router } from "express";
import {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  login,
  register,
  check_Email,
  check_username,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import multer from "multer";
const upload = multer();

const router = Router();

//---------------------------------Get---------------------------------------
router.get("/users", verifyToken, isAdmin, getUsers);

router.get("/check_email/:email", verifyToken, isAdmin, check_Email);

router.get("/check_username/:username", verifyToken, isAdmin, check_username);

router.post("/users", verifyToken, isAdmin, upload.none(), postUsers);

router.put("/users/:id", verifyToken, isAdmin, putUsers);

router.delete("/users/:id", verifyToken, isAdmin, deleteUsers);

router.post("/login", login);

router.post("/register", register);

export default router;
