import { pool } from '../db.js';

//-------------------------------get-----------------------------------------
export const getCat = async () => {
        const query= `SELECT * FROM "FPM_Catego"`
        const result = await pool.query(query);
        return result.rows
};