import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getP = async () => {
  const query = `SELECT * FROM "FPT_Proyec"`;
  const result = await pool.query(query);
  return result.rows;
};

//---------------------------------Get---------------------------------------
export const getidP = async (id) => {
  const query = `
  SELECT "Proy_Id", "Proy_Titul", "Proy_Descr", "Proy_Resum", "Proy_FecRe", proy_statu,"Proy_NomAu", "Cate_NomCa"
  FROM "FPT_Proyec"
  JOIN "FPM_Catego" on "FPM_Catego"."Cate_Id" = "FPT_Proyec"."Proy_CatId"
  WHERE "Proy_Id" = $1`;
  const result = await pool.query(query, [id]);
  return result.rows;
};

//-------------------------------Post-----------------------------------------
export const postP = async (data) => {
  const query = `
        INSERT INTO "FPT_Proyec"("Proy_Titul", "Proy_Descr", "Proy_Resum", "Proy_FecRe", proy_statu, "Proy_NomAu", "Proy_CatId")
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "Proy_Id"
    `;

  const values = [
    data.Proy_Titul,
    data.Proy_Descr,
    data.Proy_Resum,
    data.Proy_FecRe,
    data.proy_statu,
    data.Proy_NomAu,
    data.Proy_CatId,
  ];

  const result = await pool.query(query, values);
  return result.rows;
};
