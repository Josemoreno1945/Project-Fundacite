import { pool } from '../db.js';

//-------------------------------get-----------------------------------------
export const getTa = async () => {
        const query= `SELECT * FROM "FPD_Tarchi"`
        const result = await pool.query(query);
        return result.rows
};