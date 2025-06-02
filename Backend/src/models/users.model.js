import { pool } from '../db.js';

//---------------------------------Get---------------------------------------
export const getU = async()=>{
        const query = 
        `SELECT * 
        FROM "FPM_Usuari"
        `
        const result =await pool.query(query)
        return result.rows
}


/*
//---------------------------------Get---------------------------------------
export const getDeptid = async(id)=>{
        const query = "SELECT * FROM departments WHERE id_departments=$1"
        const result =await pool.query(query,[id])
        return result.rows
}

//-------------------------------Post-----------------------------------------

export const postDept = async(data)=>{
        const query = `INSERT INTO departments(name, address, phone, email, operational_status)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`
        
        const values=[
            data.name,
            data.address,
            data.phone,
            data.email,
            data.operational_status
        ]
        const result =await pool.query(query,values)
        return result.rows
}

*/