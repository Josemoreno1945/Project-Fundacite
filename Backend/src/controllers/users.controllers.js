import {
  getU,
  postU,
  putU,
  getUserByusername,
  postRegister,
  getUserbyemail,
  getUserbyusername,
  FiltroNUsuario,
  FiltroEmail,
  FiltroRol,
  getUser,
  getUinSesion,
  getUInactivo,
  ActivarU,
  DesactivarU,
  putContraseña,
} from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "../schemas/users.schemas.js";
import passwordSchema from "../schemas/password.Schema.js";
import loginSchema from "../schemas/login.schemas.js";
import { errors, throwError } from "../utils/errors.js";

import nodemailer from "nodemailer";
import { pool } from "../db.js";

//---------------------------------Filtro------------------------------------
export const FNomusuario = async (req, res, next) => {
  try {
    const data = req.body;
    const rows = await FiltroNUsuario(data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const FEmail = async (req, res, next) => {
  try {
    const data = req.body;
    const rows = await FiltroEmail(data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const FRol = async (req, res, next) => {
  try {
    const data = req.body;
    const rows = await FiltroRol(data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//---------------------------------Get---------------------------------------
export const getUsers_inSesion = async (req, res, next) => {
  try {
    const id = req.user.id;
    console.log("nose", req.user);
    const rows = await getUinSesion(id);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const rows = await getU();
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getUsersInactivo = async (req, res, next) => {
  try {
    const rows = await getUInactivo();
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getUsersVer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await getUser(id);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
//--------------------------------------get por email---------------------------
export const check_Email = async (req, res, next) => {
  try {
    const email = req.params.email;
    const rows = await getUserbyemail(email);
    return res.json({ exists: !!rows });
  } catch (error) {
    next(error);
  }
};
//--------------------------------------get por usuario---------------------------
export const check_username = async (req, res, next) => {
  try {
    const username = req.params.username;
    const rows = await getUserbyusername(username);
    return res.json({ exists: !!rows });
  } catch (error) {
    next(error);
  }
};

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
    const usernameExist = await getUserByusername(data.Usua_NomUs);
    if (usernameExist) {
      throwError(errors.userDuplicated);
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

    const parseU = userSchema.safeParse(data);

    if (
      !data.Usua_PrimN &&
      !data.Usua_PrimA &&
      !data.Usua_NomUs &&
      !data.Usua_Email &&
      !data.Usua_RolId
    ) {
      throwError(errors.missingFields);
    }

    const emailExist = await getUserbyemail(data.Usua_Email);
    if (emailExist) {
      throwError(errors.User_emailDuplicated);
    }
    const usernameExist = await getUserByusername(data.Usua_NomUs);
    if (usernameExist) {
      throwError(errors.userDuplicated);
    }

    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }

    const rows = await putU(id, data);
    res.json({ rows, message: "Usuario actualizado con exito" });
  } catch (error) {
    next(error);
  }
};

//-------------------------------Delete-----------------------------------------

export const DesactivarUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userToDelete = await getUser(id);
    if (userToDelete?.Usua_Protected) {
      return res
        .status(403)
        .json({ message: "No puedes eliminar este usuario." });
    }
    const rows = await DesactivarU(id);
    if (rows === 0) {
      return res.status(404).json({ message: "usuario no encontrada" });
    } else {
      return res.json({ message: "usuario eliminadO" });
    }
  } catch (error) {
    next(error);
  }
};

//-------------------------------ACTIVAR-----------------------------------------
export const activarUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await ActivarU(id);
    if (rows === 0) {
      return res.status(404).json({ message: "usuario no encontrada" });
    } else {
      return res.json({ message: "usuario eliminadO" });
    }
  } catch (error) {
    next(error);
  }
};
//-------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------------------------------

export const forgotPassword = async (req, res, next) => {
  try {
    //manejo de errores , si hay email y si existe el usuario
    const { email } = req.body;
    if (!email) {
      throwError(errors.missingFields);
    }

    const user = await getUserbyemail(email);
    if (!user) {
      throwError(errors.User_emailNotFound);
    }

    //aqui creo un token para el url nuevo
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.Usua_Id }, secret, { expiresIn: "1h" });

    const frontendUrl = process.env.FRONTEND_URL;
    const resetUrl = `${frontendUrl}#/reset-password?token=${token}`; //el url

    //la configuracion para usar el nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    //el correo
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Recuperar contraseña - Fundacite",
      html: `
        <p>Has solicitado recuperar tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña (válido 1 hora):</p>
        <p><a href="${resetUrl}">Recuperar contraseña</a></p>
        <p>Si no solicitaste esto, puedes ignorar el mensaje.</p>
      `,
    };
    //AQUI MANDO EL EMAIL
    await transporter.sendMail(mailOptions);

    return res.json({
      message: "Correo Enviado",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!password) {
      throwError(errors.missingFields);
    }

    const parseU = passwordSchema.safeParse({ Usua_Contr: password });
    if (!parseU.success) {
      return res.status(400).json({
        errors: parseU.error.issues,
      });
    }

    const secret = process.env.JWT_SECRET;
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      throwError(errors.invalidToken);
    }

    const userId = payload.id;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const result = await putContraseña(hashed, userId);

    if (!result) {
      throwError(errors.userNotFound);
    }

    return res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};
