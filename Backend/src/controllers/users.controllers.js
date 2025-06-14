import { getU, postU, deleteU, putU } from "../models/users.model.js";

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
    const rows = await postU(data);
    return res.json(rows);
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
