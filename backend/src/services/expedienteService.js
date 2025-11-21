import { getConnection, sql } from "../db/connection.js";

export const crearExpediente = async ({ codigo, descripcion, tecnicoId }) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("codigo", sql.VarChar(50), codigo)
    .input("descripcion", sql.VarChar(500), descripcion || null)
    .input("tecnico_id", sql.Int, tecnicoId)
    .execute("spExpedientes_Insert");

  return result.recordset[0];
};

export const listarExpedientes = async ({ estado, fechaInicio, fechaFin }) => {
  const pool = await getConnection();
  const request = pool.request();

  request.input("fechaInicio", sql.DateTime, fechaInicio || null);
  request.input("fechaFin", sql.DateTime, fechaFin || null);
  request.input("estado", sql.VarChar(50), estado || null);

  const result = await request.execute("spReportes_Expedientes");
  return result.recordset;
};

export const cambiarEstadoExpediente = async ({
  expedienteId,
  nuevoEstado,
  usuarioId,
  justificacion
}) => {
  const pool = await getConnection();
  await pool
    .request()
    .input("expediente_id", sql.Int, expedienteId)
    .input("nuevo_estado", sql.VarChar(50), nuevoEstado)
    .input("usuario_id", sql.Int, usuarioId)
    .input("justificacion", sql.VarChar(500), justificacion || null)
    .execute("spExpedientes_CambiarEstado");
};
