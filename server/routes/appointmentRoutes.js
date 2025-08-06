import express from "express";
import {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getAvailableTimes
} from "../controllers/appointmentController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Crear un nuevo turno (paciente)
router.post("/", verifyToken, createAppointment);

// Obtener los turnos del usuario (paciente o profesional)
router.get("/my", verifyToken, getMyAppointments);

// Cancelar turno
router.delete("/:id", verifyToken, cancelAppointment);

//ver turnos disponibles
router.get("/available", verifyToken, getAvailableTimes);

export default router;
