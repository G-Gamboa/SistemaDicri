import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig.js";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No autorizado" });

  const [, token] = header.split(" ");
  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const authorizeRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};
