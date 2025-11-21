import { getConnection, sql } from "../db/connection.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig.js";

export const login = async (email, password) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("email", sql.VarChar(100), email)
    .execute("spUsuarios_Login");

  const user = result.recordset[0];
  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  if (password !== user.password_hash) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.usuario_id, role: user.rol },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return {
    token,
    user: {
      id: user.usuario_id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    }
  };
};
