import Appointment from "../models/Appointment.js";

// Crear turno
export const createAppointment = async (req, res) => {
  try {
    const { professional, date, reason } = req.body;

    const newAppointment = new Appointment({
      patient: req.userId,
      professional,
      date,
      reason,
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el turno." });
  }
};

// Obtener turnos del usuario (puede ser paciente o profesional)
export const getMyAppointments = async (req, res) => {
  try {
    const role = req.userRole;
    const userId = req.userId;

    let appointments;

    if (role === "paciente") {
      appointments = await Appointment.find({ patient: userId })
        .populate("professional", "name email");
    } else if (role === "dentista") {
      appointments = await Appointment.find({ professional: userId })
        .populate("patient", "name email");
    } else {
      return res.status(403).json({ message: "Rol no autorizado" });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los turnos." });
  }
};

// Cancelar turno
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    // Solo el paciente puede cancelar su propio turno
    if (appointment.patient.toString() !== req.userId) {
      return res.status(403).json({ message: "No autorizado" });
    }

    appointment.status = "cancelado";
    await appointment.save();

    res.json({ message: "Turno cancelado" });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar el turno." });
  }
};
