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

    console.log("UserID:", req.userId);
    console.log("Body:", req.body);

    const saved = await newAppointment.save();

    console.log("Creando turno con:", {
      patient: req.userId,
      professional,
      date,
      reason,
    });
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


// Obtener horarios disponibles para un día
export const getAvailableTimes = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Fecha requerida" });
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const appointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const takenTimes = appointments.map((appt) =>
      new Date(appt.date).toISOString().slice(11, 16)
    );

    const allTimes = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00",
    ];

    const availableTimes = allTimes.filter((time) => !takenTimes.includes(time));

    res.json({ availableTimes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener horarios disponibles" });
  }
};

