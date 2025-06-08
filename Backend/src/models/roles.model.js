import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getR = async () => {
  const query = `SELECT "Rol_Id", "Rol_Nombre"
	FROM "FPM_Rol"`;
  const result = await pool.query(query);
  return result.rows;
};
