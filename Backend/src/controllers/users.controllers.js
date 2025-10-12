import {
  getU,
  postU,
  deleteU,
  putU,
  getUserByusername,
  postRegister,
} from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//---------------------------------Get---------------------------------------
export const getUsers = async (req, res) => {
  try {
    const rows = await getU();
    res.json(rows);
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
export const postUsers = async (req, res) => {
  try {
    const data = req.body;

    if (data.Usua_Contr) {
      const salt = await bcrypt.genSalt(10);
      data.Usua_Contr = await bcrypt.hash(data.Usua_Contr, salt);
    }

    const rows = await postU(data);
    return res.json({ rows, message: "Usuario registrado con exito" });
  } catch (error) {
    console.error("Error when post users:", error);
    res.status(500).send("Error when post users");
  }
};

//--------------------------------Put----------------------------------------
export const putUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const rows = await putU(id, data);
    res.json(rows);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).send("Error actualizando usuario");
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

export const login = async (req, res) => {
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

export const register = async (req, res) => {
  try {
    const data = req.body;

    if (data.Usua_Contr) {
      const salt = await bcrypt.genSalt(10);
      data.Usua_Contr = await bcrypt.hash(data.Usua_Contr, salt);
    }

    const rows = await postRegister(data);
    return res.json(rows);
  } catch (error) {
    console.error("Error when post users:", error);
    res.status(500).send("Error when post users");
  }
};
