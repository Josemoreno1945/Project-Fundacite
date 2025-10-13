import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getP = async () => {
  const query = `
  SELECT * FROM "FPT_Proyec"
  WHERE proy_statu = 'pendiente'
`;
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
    "pendiente",
    data.Proy_NomAu,
    data.Proy_CatId,
  ];

  const result = await pool.query(query, values);
  return result.rows;
};

export const putProy = async (data) => {
  const client = await pool.connect();

  try {
    console.log(data);
    const updateStatusQuery = `
      UPDATE "FPT_Proyec"
      SET proy_statu = 'aprobado'
      WHERE "Proy_Id" = $1
    `;
    await client.query(updateStatusQuery, [data.Proy_Id]);

    const insertAceQuery = `
      INSERT INTO "FPT_ProAce"("ProyA_PrId", "ProyA_FecA", "ProyA_MotA", "ProyA_Come")
      VALUES ($1, $2, $3, $4)
    `;
    const aceValues = [
      data.Proy_Id,
      new Date(), // Fecha actual automática
      "Aprobado", // Motivo por defecto
      "Aprobado sin observaciones",
    ];
    await client.query(insertAceQuery, aceValues);

    return { message: "Proyecto aprobado exitosamente." };
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const getPA = async () => {
  const query = `
    SELECT 
      p."Proy_Id",
      p."Proy_Titul",
      p."Proy_Descr",
      p."Proy_Resum",
      p."Proy_FecRe",
      p.proy_statu,
      p."Proy_UsuId",
      p."Proy_CatId",
      p."Proy_NomAu"
    FROM "FPT_ProAce" a
    JOIN "FPT_Proyec" p ON a."ProyA_PrId" = p."Proy_Id"
  `;
  const result = await pool.query(query);
  return result.rows;
};

//delete -------------------------------------------------------
export const deleteProyById = async (proyId) => {
  const query = `DELETE FROM "FPT_Proyec" WHERE "Proy_Id" = $1 RETURNING *`;
  const result = await pool.query(query, [proyId]);
  return result.rows[0] || null;
};
