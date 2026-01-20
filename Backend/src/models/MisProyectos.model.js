import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getMisProyectos = async (data) => {
  const query = `
    SELECT "Proy_Titul" , "Proy_Id"
    FROM public."FPT_ProAce"
    JOIN public."FPT_Proyec" on "FPT_Proyec"."Proy_Id" = "FPT_ProAce"."ProyA_PrId"
    JOIN public."FPM_Usuari" ON "FPM_Usuari"."Usua_Id" = "FPT_Proyec"."Proy_UsuId"
    WHERE "Usua_NomUs"= $1
  `;
  const values = [data.Usua_NomUs];
  const result = await pool.query(query, values);
  return result.rows;
};
