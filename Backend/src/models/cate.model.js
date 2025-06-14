import { pool } from "../db.js";

//-------------------------------get-----------------------------------------
export const getCat = async () => {
  const query = `SELECT * FROM "FPM_Catego"`;
  const result = await pool.query(query);
  return result.rows;
};

//-------------------------------post-----------------------------------------
export const postCat = async (data) => {
  const query = `INSERT INTO "FPM_Catego"("Cate_NomCa", "Cate_Descr") VALUES ($1, $2)`;

  const values = [data.Cate_NomCa, data.Cate_Descr];
  const result = await pool.query(query, values);
  return result.rows;
};

//--------------------------------Put----------------------------------------

export const putCat = async (id, data) => {
  const query = `
        UPDATE "FPM_Catego"
        SET "Cate_NomCa"=$1, "Cate_Descr"=$2
        WHERE "Cate_Id"= $3 RETURNING *
        `;

  const values = [data.Cate_NomCa, data.Cate_Descr, id];

  const result = await pool.query(query, values);
  return result.rows;
};

//-------------------------------Delete-----------------------------------------

export const deleteCat = async (id) => {
  const query = `
  DELETE FROM "FPM_Catego"
	WHERE "Cate_Id"=$1`;
  const result = await pool.query(query, [id]);
  return result.rows;
};
