import { getConnection, sql } from "../db/connection.js";

export const obtenerReporteExpedientes = async ({ fechaInicio, fechaFin, estado }) => {
  const pool = await getConnection();
  const request = pool.request();

  request.input("fechaInicio", sql.DateTime, fechaInicio || null);
  request.input("fechaFin", sql.DateTime, fechaFin || null);
  request.input("estado", sql.VarChar(50), estado || null);

  const result = await request.execute("spReportes_Expedientes");
  return result.recordset;
};
