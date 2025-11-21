import { Router } from "express";
import { historialExpedienteController } from "../controllers/historialController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

// Todos los roles pueden ver el historial del expediente
router.get(
  "/:expedienteId",
  authorizeRoles("Tecnico", "Coordinador", "Administrador"),
  historialExpedienteController
);

export default router;
