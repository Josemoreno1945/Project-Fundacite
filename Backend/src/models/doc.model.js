import { pool } from "../db.js";

//-------------------------------Post-----------------------------------------
export const postDoc = async (data, rutaRemota) => {
  const query = `INSERT INTO "FPD_Docume"("Doc_NomArc", "Doc_RutaAr", "Doc_TiArId","Doc_ProyId")
	VALUES ($1,$2,$3,$4) RETURNING *`;

  const values = [
    data.Doc_NomArc,
    rutaRemota,
    data.Doc_TiArId,
    data.Doc_ProyId,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

//-------------------------------get-----------------------------------------
export const getDoc = async () => {
  const query = `SELECT * FROM "FPD_Docume"`;
  const result = await pool.query(query);
  return result.rows;
};

//--------------------------------------------------------------------------------
export const getPdfByProyId = async (proyId) => {
  const query = `SELECT * FROM "FPD_Docume" WHERE "Doc_ProyId" = $1 AND "Doc_TiArId" = 2 ORDER BY "Doc_Id" DESC LIMIT 1`;
  const r = await pool.query(query, [proyId]);
  return r.rows[0] || null;
};

//delete---------------------------------------------------------------------------

export const deleteDocsByProyId = async (proyId) => {
  const query = `DELETE FROM "FPD_Docume" WHERE "Doc_ProyId" = $1 RETURNING *`;
  const result = await pool.query(query, [proyId]);
  return result.rows;
};
