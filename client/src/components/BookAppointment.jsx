import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createAppointment, fetchAvailableTimes } from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
  const { token } = useContext(AuthContext);

  const [specialties] = useState([
    "Odontología general",
    "Ortodoncia",
    "Endodoncia",
    "Periodoncia",
    "Prótesis dental",
  ]);

  const [form, setForm] = useState({
    specialty: "",
    date: null,
    time: "",
  });

  const [message, setMessage] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);


useEffect(() => {
    const loadTimes = async () => {
      if (form.date) {
        const dateStr = form.date.toISOString().split("T")[0];
        const times = await fetchAvailableTimes(dateStr, token);
        setAvailableTimes(times);
        console.log("Horarios disponibles:", times);
      } else {
        setAvailableTimes([]);
      }
    };

    loadTimes();
  }, [form.date, token]);


  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = domingo, 6 = sábado
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

      if (!form.date || !form.time || !form.specialty) {
      setMessage("❌ Por favor completá todos los campos");
      return;
    }

    const dateStr = form.date.toISOString().split("T")[0];
    const fullDateTime = `${dateStr}T${form.time}:00`;

    // Por ahora, hardcodea el ID de un profesional (sacalo de tu base de datos)
    const appointmentData = {
      professional: "64a0d5e6c4a8ab3a5564a123", // ejemplo
      date: fullDateTime,
      reason: form.specialty,
    };

    const res = await createAppointment(appointmentData, token);

    if (res.error) {
      setMessage("❌ Error al agendar turno");
    } else {
      setMessage("✅ Turno agendado con éxito");
      setForm({ specialty: "", date: "", time: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Agendar un turno</h2>

      {message && <p className="mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccioná una especialidad</option>
          {specialties.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Fecha con solo días hábiles */}
        <DatePicker
          selected={form.date}
          onChange={(date) => setForm({ ...form, date })}
          filterDate={isWeekday}
          minDate={new Date()}
          placeholderText="Seleccioná una fecha"
          className="w-full p-2 border rounded"
          dateFormat="yyyy-MM-dd"
        />

        {/* Horarios disponibles */}
        {availableTimes.length > 0 && (
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccioná un horario</option>
            {availableTimes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Agendar turno
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
