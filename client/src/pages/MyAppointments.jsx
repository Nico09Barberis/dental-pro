import { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://dental-pro.onrender.com/api/appointments/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los turnos");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Cargando turnos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (appointments.length === 0) return <p>No tenés turnos agendados.</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Turnos</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id} className="border p-3 mb-2 rounded">
            <p><strong>Fecha:</strong> {new Date(appt.date).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {appt.time}</p>
            <p><strong>Especialidad:</strong> {appt.specialty}</p>
            <p><strong>Profesional:</strong> {appt.professional.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAppointments;
