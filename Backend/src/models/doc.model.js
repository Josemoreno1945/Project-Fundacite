import { pool } from "../db.js";

//-------------------------------Post-----------------------------------------
export const postDoc = async (data, imagenPath) => {
  const query = `INSERT INTO "FPD_Docume"("Doc_NomArc", "Doc_RutaAr", "Doc_TiArId","Doc_ProyId")
	VALUES ($1,$2,$3,$4)`;

  const values = [
    data.Doc_NomArc,
    imagenPath,
    data.Doc_TiArId,
    data.Doc_ProyId,
  ];
  const result = await pool.query(query, values);
  return result.rows;
};

//-------------------------------get-----------------------------------------
export const getDoc = async () => {
  const query = `SELECT * FROM "FPD_Docume"`;
  const result = await pool.query(query);
  return result.rows;
};
