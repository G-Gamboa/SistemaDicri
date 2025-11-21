import { getConnection, sql } from "../db/connection.js";

export const obtenerHistorialPorExpediente = async (expedienteId) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("expediente_id", sql.Int, expedienteId)
    .execute("spHistorial_Expediente");

  return result.recordset;
};
