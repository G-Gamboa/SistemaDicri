import sql from "mssql";
import { dbConfig } from "../config/dbConfig.js";

let pool;

export const getConnection = async () => {
  if (pool) return pool;
  pool = await sql.connect(dbConfig);
  return pool;
};

export { sql };
