import { getConnection, sql } from "../db/connection.js";

export const crearIndicio = async ({
  expedienteId,
  descripcion,
  color,
  tamano,
  peso,
  ubicacion,
  tecnicoId
}) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("expediente_id", sql.Int, expedienteId)
    .input("descripcion", sql.VarChar(500), descripcion)
    .input("color", sql.VarChar(50), color || null)
    .input("tamano", sql.VarChar(50), tamano || null)
    .input("peso", sql.Decimal(10, 2), peso || null)
    .input("ubicacion", sql.VarChar(200), ubicacion || null)
    .input("tecnico_id", sql.Int, tecnicoId)
    .execute("spIndicios_Insert");

  return result.recordset[0];
};

export const listarIndiciosPorExpediente = async (expedienteId) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("expediente_id", sql.Int, expedienteId)
    .execute("spIndicios_ListByExpediente");

  return result.recordset;
};
