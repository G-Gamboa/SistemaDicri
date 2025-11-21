import { Router } from "express";
import {
  crearExpedienteController,
  listarExpedientesController,
  aprobarExpedienteController,
  rechazarExpedienteController
} from "../controllers/expedienteController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.post("/", authorizeRoles("Tecnico", "Administrador"), crearExpedienteController);
router.get("/", authorizeRoles("Tecnico", "Coordinador", "Administrador"), listarExpedientesController);
router.put("/:id/aprobar", authorizeRoles("Coordinador", "Administrador"), aprobarExpedienteController);
router.put("/:id/rechazar", authorizeRoles("Coordinador", "Administrador"), rechazarExpedienteController);

export default router;
