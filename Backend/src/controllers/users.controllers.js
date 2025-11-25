import {
  getU,
  postU,
  deleteU,
  putU,
  getUserByusername,
  postRegister,
  getUserbyemail,
  getUserbyusername,
} from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "../schemas/users.schemas.js";
import loginSchema from "../schemas/login.schemas.js";
import { errors, throwError } from "../utils/errors.js";
import { da } from "zod/v4/locales";

//---------------------------------Get---------------------------------------
export const getUsers = async (req, res, next) => {
  try {
    const rows = await getU();
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//--------------------------------------get por email---------------------------
export const check_Email = async (req, res) => {
  try {
    const email = req.params.email;
    const rows = await getUserbyemail(email);
    return res.json({ exists: !!rows });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Error getting user");
  }
};
//--------------------------------------get por usuario---------------------------
export const check_username = async (req, res) => {
  try {
    const username = req.params.username;
    const rows = await getUserbyusername(username);
    return res.json({ exists: !!rows });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Error getting user");
  }
};
/*
//---------------------------------Get---------------------------------------
export const getDepartmentsId = async(req,res)=>{
    try{
        const id=req.params.id
        const rows = await getDeptid(id)

        if (!rows || rows.length === 0){
            return res.status(404).json({ messaje : "Department not found"});
        }
        res.json(rows);

    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}

*/

//-------------------------------Post-----------------------------------------
export const postUsers = async (req, res, next) => {
  try {
    const data = req.body;

    const parseU = userSchema.safeParse(data);

    if (
      !data.Usua_PrimN &&
      !data.Usua_PrimA &&
      !data.Usua_NomUs &&
      !data.Usua_Email &&
      !data.Usua_Contr &&
      !data.Usua_RolId
    ) {
      throwError(errors.missingFields);
    }

    const emailExist = await getUserbyemail(data.Usua_Email);
    if (emailExist) {
      throwError(errors.User_emailDuplicated);
    }

    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }

    if (data.Usua_Contr) {
      const salt = await bcrypt.genSalt(10);
      data.Usua_Contr = await bcrypt.hash(data.Usua_Contr, salt);
    }

    const rows = await postU(data);
    return res.json({ rows, message: "Usuario registrado con exito" });
  } catch (error) {
    next(error);
  }
};

//--------------------------------Put----------------------------------------
export const putUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (
      !data.Usua_PrimN &&
      !data.Usua_PrimA &&
      !data.Usua_NomUs &&
      !data.Usua_Email &&
      !data.Usua_RolId
    ) {
      throwError(errors.missingFields);
    }

    const rows = await putU(id, data);
    res.json({ rows, message: "Usuario actualizado con exito" });
  } catch (error) {
    next(error);
  }
};

//-------------------------------Delete-----------------------------------------

export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await deleteU(id);

    if (rows === 0) {
      return res.status(404).json({ message: "usuario no encontrada" });
    } else {
      return res.json({ message: "usuario eliminada" });
    }
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).send("Error obteniendo usuario");
  }
};

export const login = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.Usua_NomUs && !data.Usua_Contr) {
      throwError(errors.missingFields);
    }
    const parseU = loginSchema.safeParse(data);
    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }
    //-------------------------------------------------

    const user = await getUserByusername(data.Usua_NomUs);
    if (!user) {
      throwError(errors.userNotFound);
    }

    const valid = await bcrypt.compare(data.Usua_Contr, user.Usua_Contr);
    if (!valid) {
      throwError(errors.InvalidPassword);
    }

    const token = jwt.sign(
      { id: user.Usua_Id, username: user.Usua_NomUs, rol: user.Usua_RolId },
      process.env.JWT_SECRET,
      { expiresIn: "23h" }
    );

    res.json({
      token,
      user: {
        id: user.Usua_Id,
        username: user.Usua_NomUs,
        rol: user.Usua_RolId,
      },
    });
  } catch (error) {
    next(error);
  }
  const { Usua_NomUs, Usua_Contr } = req.body;
  console.log(req.body);
  const user = await getUserByusername(Usua_NomUs);

  if (!user) return res.status(401).json({ error: "Usuario no encontrado" });
  const valid = await bcrypt.compare(Usua_Contr, user.Usua_Contr);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.Usua_Id, username: user.Usua_NomUs, rol: user.Usua_RolId },
    process.env.JWT_SECRET,
    { expiresIn: "23h" }
  );

  res.json({
    token,
    user: { id: user.Usua_Id, username: user.Usua_NomUs, rol: user.Usua_RolId },
  });
};

export const register = async (req, res, next) => {
  try {
    const data = req.body;
    if (
      !data.Usua_PrimN &&
      !data.Usua_PrimA &&
      !data.Usua_NomUs &&
      !data.Usua_Email &&
      !data.Usua_Contr
    ) {
      throwError(errors.missingFields);
    }
    const emailExist = await getUserbyemail(data.Usua_Email);
    if (emailExist) {
      throwError(errors.User_emailDuplicated);
    }

    const parseU = userSchema.safeParse(data);
    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }

    if (data.Usua_Contr) {
      const salt = await bcrypt.genSalt(10);
      data.Usua_Contr = await bcrypt.hash(data.Usua_Contr, salt);
    }

    const rows = await postRegister(data);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};
