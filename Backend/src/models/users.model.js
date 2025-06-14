import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getU = async () => {
  const query = `SELECT "Usua_Id", "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_Contr", "Rol_Nombre", "Usua_FecCr"
        FROM "FPM_Usuari"
        JOIN "FPM_Rol" ON "FPM_Rol"."Rol_Id" = "FPM_Usuari"."Usua_RolId"
        `;
  const result = await pool.query(query);
  return result.rows;
};

/*
//---------------------------------Get---------------------------------------
export const getDeptid = async(id)=>{
        const query = "SELECT * FROM departments WHERE id_departments=$1"
        const result =await pool.query(query,[id])
        return result.rows
}

//-------------------------------Post-----------------------------------------
*/
export const postU = async (data) => {
  const query = `INSERT INTO "FPM_Usuari"("Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_Contr", "Usua_RolId") VALUES ($1, $2, $3, $4, $5, $6)`;

  const values = [
    data.Usua_PrimN,
    data.Usua_PrimA,
    data.Usua_NomUs,
    data.Usua_Email,
    data.Usua_Contr,
    data.Usua_RolId,
  ];
  const result = await pool.query(query, values);
  return result.rows;
};
//--------------------------------Put----------------------------------------

export const putU = async (id, data) => {
  const query = `
        UPDATE "FPM_Usuari"
        SET "Usua_PrimN"=$1, "Usua_PrimA"=$2, "Usua_NomUs"=$3, "Usua_Email"=$4, "Usua_Contr"=$5, "Usua_RolId"=$6
        WHERE "Usua_Id"=$7  RETURNING * ;
        `;

  const values = [
    data.Usua_PrimN,
    data.Usua_PrimA,
    data.Usua_NomUs,
    data.Usua_Email,
    data.Usua_Contr,
    data.Usua_RolId,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows;
};

//-------------------------------Delete-----------------------------------------

export const deleteU = async (id) => {
  const query = `
  DELETE FROM "FPM_Usuari"
	WHERE "Usua_Id"=$1
  `;
  const result = await pool.query(query, [id]);
  return result.rows;
};
