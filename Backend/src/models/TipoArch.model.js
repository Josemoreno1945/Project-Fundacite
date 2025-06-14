import { pool } from "../db.js";

//-------------------------------get-----------------------------------------
export const getTa = async () => {
  const query = `SELECT * FROM "FPD_Tarchi"`;
  const result = await pool.query(query);
  return result.rows;
};

//-------------------------------post-----------------------------------------
export const postTa = async (data) => {
  const query = `INSERT INTO "FPD_Tarchi"("TipA_Nombr") VALUES ($1)`;

  const values = [data.TipA_Nombr];
  const result = await pool.query(query, values);
  return result.rows;
};

//--------------------------------Put----------------------------------------

export const putTa = async (id, data) => {
  const query = `
        UPDATE "FPD_Tarchi"
        SET "TipA_Nombr"=$1
        WHERE "TipA_Id"= $2 RETURNING *
        `;

  const values = [data.TipA_Nombr, id];

  const result = await pool.query(query, values);
  return result.rows;
};
