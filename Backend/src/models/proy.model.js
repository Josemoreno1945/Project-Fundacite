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

//----------------------------------------------------------put , pasar a aprobado
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

//----------------------------------------------------------put , pasar a archivado

export const putProy_archivado = async (data) => {
  const client = await pool.connect();

  try {
    console.log(data);
    const updateStatusQuery = `
      UPDATE "FPT_Proyec"
      SET proy_statu = 'archivado'
      WHERE "Proy_Id" = $1
    `;
    await client.query(updateStatusQuery, [data.Proy_Id]);

    // 2. Eliminar el proyecto de la tabla de proyectos aceptados
    const deleteAceQuery = `
      DELETE FROM "FPT_ProAce"
      WHERE "ProyA_PrId" = $1
    `;
    await client.query(deleteAceQuery, [data.Proy_Id]);

    // 3.Registrar el archivado en otra tabla si lo deseas
    const insertArchivadoQuery = `
      INSERT INTO "FPT_ProArc"("ProyAr_PrId", "ProyAr_Fec", "ProyAr_Mot")
      VALUES ($1, $2, $3)
    `;
    const archivadoValues = [
      data.Proy_Id,
      new Date(),
      "Archivado por decisión institucional",
    ];
    await client.query(insertArchivadoQuery, archivadoValues);

    return {
      message: "Proyecto archivado y eliminado de aceptados exitosamente.",
    };
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const putProy_rechazado = async (data) => {
  const client = await pool.connect();

  try {
    // 1. Actualizar estado a rechazado
    const updateStatusQuery = `
      UPDATE "FPT_Proyec"
      SET proy_statu = 'rechazado'
      WHERE "Proy_Id" = $1
    `;
    await client.query(updateStatusQuery, [data.Proy_Id]);

    // 2. Eliminar el proyecto de la tabla de proyectos aceptados
    const deleteAceQuery = `
    DELETE FROM "FPT_ProArc" 
    WHERE "ProyAr_PrId" = $1`;
    await client.query(deleteAceQuery, [data.Proy_Id]);
    // 3. Registrar el rechazo en la tabla de rechazados
    const insertRechazadoQuery = `
      INSERT INTO "FPT_ProRech"("ProyRech_PrId", "ProyRech_Fec", "ProyRech_Mot")
      VALUES ($1, $2, $3)
    `;
    const rechazadoValues = [
      data.Proy_Id,
      new Date(),
      data.motivo || "Rechazado por decisión institucional",
    ];
    await client.query(insertRechazadoQuery, rechazadoValues);

    return {
      message: "Proyecto rechazado",
    };
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

export const getArch = async () => {
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
    FROM "FPT_ProArc" a
    JOIN "FPT_Proyec" p ON a."ProyAr_PrId" = p."Proy_Id"
    WHERE p.proy_statu = 'archivado'
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const getRech = async () => {
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
      p."Proy_NomAu",
      r."ProyRech_Id",
      r."ProyRech_Fec",
      r."ProyRech_Mot"
    FROM "FPT_ProRech" r
    JOIN "FPT_Proyec" p ON r."ProyRech_PrId" = p."Proy_Id"
    ORDER BY r."ProyRech_Fec" DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};
//---------------------------------------------------------------
export const CountRech = async () => {
  const query = `
    SELECT COUNT(*)
    FROM "FPT_ProRech"
  `;
  const result = await pool.query(query);
  return result.rows[0];
};

export const CountArch = async () => {
  const query = `
    SELECT COUNT(*)
    FROM "FPT_ProArc"
  `;
  const result = await pool.query(query);
  return result.rows[0];
};

export const CountProyAp = async () => {
  const query = `
    SELECT COUNT(*)
    FROM "FPT_ProAce"
  `;
  const result = await pool.query(query);
  return result.rows[0];
};

export const CountProyPen = async () => {
  const query = `
  SELECT COUNT(*)
  FROM "FPT_Proyec"
  WHERE proy_statu = 'pendiente'
`;
  const result = await pool.query(query);
  return result.rows[0];
};

//delete -------------------------------------------------------
export const deleteProyById = async (proyId) => {
  const query = `DELETE FROM "FPT_Proyec" WHERE "Proy_Id" = $1 RETURNING *`;
  const result = await pool.query(query, [proyId]);
  return result.rows[0] || null;
};
