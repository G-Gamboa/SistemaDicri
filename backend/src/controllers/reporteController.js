import { obtenerReporteExpedientes } from "../services/reporteService.js";

export const reporteExpedientesController = async (req, res, next) => {
  try {
    const { fechaInicio, fechaFin, estado } = req.query;
    const data = await obtenerReporteExpedientes({ fechaInicio, fechaFin, estado });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
