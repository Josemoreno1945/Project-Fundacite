import { pool } from '../db.js';

//---------------------------------Get---------------------------------------
export const getP = async()=>{
        const query = `SELECT * FROM "FPT_Proyec"`
        const result =await pool.query(query)
        return result.rows
}


//-------------------------------Post-----------------------------------------
export const postP = async (data) => {
    
    const query = `
        INSERT INTO "FPT_Proyec"("Proy_Titul", "Proy_Descr", "Proy_Resum", "Proy_FecRe", proy_statu, "Proy_UsuId", "Proy_CatId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
        data.Proy_Titul,
        data.Proy_Descr,
        data.Proy_Resum,
        data.Proy_FecRe,
        data.proy_statu,
        data.Proy_UsuId,
        data.Proy_CatId
    ];

    const result = await pool.query(query, values);
    return result.rows;
};
