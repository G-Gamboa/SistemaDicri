import {
  crearIndicio,
  listarIndiciosPorExpediente
} from "../services/indicioService.js";

export const crearIndicioController = async (req, res, next) => {
  try {
    const expedienteId = parseInt(req.params.expedienteId, 10);
    const tecnicoId = req.user.userId;
    const { descripcion, color, tamano, peso, ubicacion } = req.body;
    const data = await crearIndicio({
      expedienteId,
      descripcion,
      color,
      tamano,
      peso,
      ubicacion,
      tecnicoId
    });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const listarIndiciosPorExpedienteController = async (req, res, next) => {
  try {
    const expedienteId = parseInt(req.params.expedienteId, 10);
    const data = await listarIndiciosPorExpediente(expedienteId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
