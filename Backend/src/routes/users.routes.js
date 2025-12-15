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
  FNomusuario,
  FEmail,
  FRol,
  getUsersVer,
  getUsers_inSesion,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import multer from "multer";
const upload = multer();

const router = Router();

//---------------------------------Get---------------------------------------

router.post("/FNombreUsuario", verifyToken, isAdmin, FNomusuario);
router.post("/FEmail", verifyToken, isAdmin, FEmail);
router.post("/FRol", verifyToken, isAdmin, FRol);

router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/users_inSesion", verifyToken, getUsers_inSesion);
router.get("/usersVer/:id", verifyToken, isAdmin, getUsersVer);

router.get("/check_email/:email", check_Email);

router.get("/check_username/:username", check_username);

router.post("/users", verifyToken, isAdmin, upload.none(), postUsers);

router.put("/users/:id", verifyToken, isAdmin, putUsers);

router.delete("/users/:id", verifyToken, isAdmin, deleteUsers);

router.post("/login", login);

router.post("/register", register);

export default router;
