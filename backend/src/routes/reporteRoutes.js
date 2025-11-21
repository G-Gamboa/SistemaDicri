import { Router } from "express";
import { reporteExpedientesController } from "../controllers/reporteController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.get("/expedientes", authorizeRoles("Tecnico", "Coordinador", "Administrador"), reporteExpedientesController);

export default router;
