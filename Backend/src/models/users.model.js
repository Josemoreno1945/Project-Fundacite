import { id } from "zod/v4/locales";
import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getU = async () => {
  const query = `SELECT "Usua_Id", "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_Contr", "Rol_Nombre", "Usua_FecCr"
        FROM "FPM_Usuari"
        JOIN "FPM_Rol" ON "FPM_Rol"."Rol_Id" = "FPM_Usuari"."Usua_RolId"
        WHERE "Usua_Activo" = TRUE
        `;
  const result = await pool.query(query);
  return result.rows;
};
export const getUInactivo = async () => {
  const query = `SELECT "Usua_Id", "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_Contr", "Rol_Nombre", "Usua_FecCr"
        FROM "FPM_Usuari"
        JOIN "FPM_Rol" ON "FPM_Rol"."Rol_Id" = "FPM_Usuari"."Usua_RolId"
        WHERE "Usua_Activo" = FALSE
        `;
  const result = await pool.query(query);
  return result.rows;
};

//---------------------------------GetUser---------------------------------------
export const getUser = async (id) => {
  const query = `SELECT "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Rol_Nombre","Usua_Protected"
        FROM "FPM_Usuari"
        JOIN "FPM_Rol" ON "FPM_Rol"."Rol_Id" = "FPM_Usuari"."Usua_RolId"
        WHERE "Usua_Id" = $1
        `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const getUinSesion = async (id) => {
  const query = `SELECT "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Rol_Nombre"
        FROM "FPM_Usuari"
        JOIN "FPM_Rol" ON "FPM_Rol"."Rol_Id" = "FPM_Usuari"."Usua_RolId"
        WHERE "Usua_Id" = $1
        `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

//---------------------------------Get email---------------------------------------
export const getUserbyemail = async (Usua_Email) => {
  const query = 'SELECT * FROM "FPM_Usuari" WHERE "Usua_Email" = $1';
  const result = await pool.query(query, [Usua_Email]);
  return result.rows[0];
};

//---------------------------------Get username---------------------------------------
export const getUserbyusername = async (Usua_NomUs) => {
  const query = 'SELECT * FROM "FPM_Usuari" WHERE "Usua_NomUs" = $1';
  const result = await pool.query(query, [Usua_NomUs]);
  return result.rows[0];
};

//-------------------------------Post-----------------------------------------

export const postU = async (data) => {
  const query = `INSERT INTO "FPM_Usuari"("Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_Contr", "Usua_RolId") VALUES ($1, $2, $3, $4, $5, $6)`;

  const values = [
    data.Usua_PrimN,
    data.Usua_PrimA,
    data.Usua_NomUs,
    data.Usua_Email,
    data.Usua_Contr,
    data.Usua_RolId,
  ];
  const result = await pool.query(query, values);
  return result.rows;
};
//--------------------------------Put----------------------------------------

export const putU = async (id, data) => {
  const query = `
        UPDATE "FPM_Usuari"
        SET "Usua_PrimN"=$1, "Usua_PrimA"=$2, "Usua_NomUs"=$3, "Usua_Email"=$4, "Usua_RolId"=$5
        WHERE "Usua_Id"=$6  RETURNING * ;
        `;

  const values = [
    data.Usua_PrimN,
    data.Usua_PrimA,
    data.Usua_NomUs,
    data.Usua_Email,
    data.Usua_RolId,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows;
};

//-------------------------------FILTROS----------------------------------------
export const FiltroNUsuario = async (data) => {
  const query = `
  SELECT "Usua_Id", "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_RolId"
	FROM public."FPM_Usuari"
	WHERE unaccent (LOWER("Usua_NomUs")) LIKE unaccent(LOWER('%' || $1 || '%'))
  `;
  const values = [data.Usua_NomUs];
  const result = await pool.query(query, values);
  return result.rows;
};

export const FiltroEmail = async (data) => {
  const query = `
  SELECT "Usua_Id", "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_RolId"
	FROM public."FPM_Usuari"
	WHERE unaccent(LOWER("Usua_Email")) LIKE unaccent(LOWER('%' || $1 || '%'))
  `;
  const values = [data.Usua_Email];
  const result = await pool.query(query, values);
  return result.rows;
};

export const FiltroRol = async (data) => {
  const query = ` 
  SELECT "Usua_Id", "Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email","Rol_Nombre"
	FROM public."FPM_Usuari"
	JOIN "FPM_Rol" ON "FPM_Usuari"."Usua_RolId"="FPM_Rol"."Rol_Id"
	WHERE unaccent(LOWER("Rol_Nombre")) LIKE unaccent(LOWER('%' || $1 || '%'))
  `;
  const values = [data.Rol_Nombre];
  const result = await pool.query(query, values);
  return result.rows;
};

//-------------------------------INACTIVO Y ACTIVO-----------------------------------------

export const DesactivarU = async (id) => {
  const query = `
  UPDATE "FPM_Usuari"
    SET "Usua_Activo" = FALSE
    WHERE "Usua_Id" = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [id]);
  return result.rows;
};

export const ActivarU = async (id) => {
  const query = `
  UPDATE "FPM_Usuari"
    SET "Usua_Activo" = TRUE
    WHERE "Usua_Id" = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [id]);
  return result.rows;
};
//---------------------------------------------------------------------------------
export const getUserByusername = async (Usua_NomUs) => {
  const query = 'SELECT * FROM "FPM_Usuari" WHERE "Usua_NomUs" = $1';
  const result = await pool.query(query, [Usua_NomUs]);
  return result.rows[0];
};

export const postRegister = async (data) => {
  const query = `INSERT INTO "FPM_Usuari"("Usua_PrimN", "Usua_PrimA", "Usua_NomUs", "Usua_Email", "Usua_Contr", "Usua_RolId") VALUES ($1, $2, $3, $4, $5, $6)`;

  const values = [
    data.Usua_PrimN,
    data.Usua_PrimA,
    data.Usua_NomUs,
    data.Usua_Email,
    data.Usua_Contr,
    2,
  ];
  const result = await pool.query(query, values);
  return result.rows;
};
