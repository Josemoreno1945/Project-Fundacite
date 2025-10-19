import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";
const { Pool } = pg;

const pool = new Pool({
  // user: DB_USER,
  //host: DB_HOST,
  //database: DB_DATABASE,
  //password: DB_PASSWORD,
  //port: DB_PORT,
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export { pool };
