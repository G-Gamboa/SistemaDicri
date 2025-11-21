import { obtenerHistorialPorExpediente } from "../services/historialService.js";

export const historialExpedienteController = async (req, res, next) => {
  try {
    const expedienteId = parseInt(req.params.expedienteId, 10);
    const data = await obtenerHistorialPorExpediente(expedienteId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
