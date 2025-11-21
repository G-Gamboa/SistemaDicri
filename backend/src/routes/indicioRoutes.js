import { Router } from "express";
import {
  crearIndicioController,
  listarIndiciosPorExpedienteController
} from "../controllers/indicioController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.post("/:expedienteId", authorizeRoles("Tecnico", "Administrador"), crearIndicioController);
router.get("/:expedienteId", authorizeRoles("Tecnico", "Coordinador", "Administrador"), listarIndiciosPorExpedienteController);

export default router;
