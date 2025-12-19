import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getR = async () => {
  const query = `SELECT "Rol_Id", "Rol_Nombre"
	FROM "FPM_Rol"
  WHERE "Rol_Nombre" = 'Normal' or "Rol_Nombre" = 'Administrador'
  `;
  const result = await pool.query(query);
  return result.rows;
};
