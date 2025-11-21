import {
  crearExpediente,
  listarExpedientes,
  cambiarEstadoExpediente
} from "../services/expedienteService.js";

export const crearExpedienteController = async (req, res, next) => {
  try {
    const { codigo, descripcion } = req.body;
    const tecnicoId = req.user.userId;
    const data = await crearExpediente({ codigo, descripcion, tecnicoId });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const listarExpedientesController = async (req, res, next) => {
  try {
    const { estado, fechaInicio, fechaFin } = req.query;
    const data = await listarExpedientes({ estado, fechaInicio, fechaFin });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const aprobarExpedienteController = async (req, res, next) => {
  try {
    const expedienteId = parseInt(req.params.id, 10);
    const usuarioId = req.user.userId;
    await cambiarEstadoExpediente({
      expedienteId,
      nuevoEstado: "Aprobado",
      usuarioId,
      justificacion: "Aprobado por coordinador"
    });
    res.json({ message: "Expediente aprobado" });
  } catch (err) {
    next(err);
  }
};

export const rechazarExpedienteController = async (req, res, next) => {
  try {
    const expedienteId = parseInt(req.params.id, 10);
    const usuarioId = req.user.userId;
    const { justificacion } = req.body;
    await cambiarEstadoExpediente({
      expedienteId,
      nuevoEstado: "Rechazado",
      usuarioId,
      justificacion
    });
    res.json({ message: "Expediente rechazado" });
  } catch (err) {
    next(err);
  }
};
