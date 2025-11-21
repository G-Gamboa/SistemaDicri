import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import expedienteRoutes from "./routes/expedienteRoutes.js";
import indicioRoutes from "./routes/indicioRoutes.js";
import reporteRoutes from "./routes/reporteRoutes.js";
import historialRoutes from "./routes/historialRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expedientes", expedienteRoutes);
app.use("/api/indicios", indicioRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/historial", historialRoutes); 

app.use(errorHandler);

export default app;
