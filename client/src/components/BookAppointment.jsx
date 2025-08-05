import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createAppointment } from "../services/api";

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
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await createAppointment(form, token);

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

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

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
