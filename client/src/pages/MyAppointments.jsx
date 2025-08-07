import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${API_URL}/api/appointments/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(data);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    const confirm = window.confirm("¿Estás seguro que deseas cancelar este turno?");
    if (!confirm) return;

    setCanceling(id);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/api/appointments/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Actualizamos el estado local
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "cancelado" } : appt
        )
      );
    } catch (error) {
      console.error("Error al cancelar turno:", error);
    } finally {
      setCanceling(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-6">Cargando turnos...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Turnos</h2>
      {appointments.length === 0 ? (
        <p className="text-center">No tenés turnos agendados.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="border p-4 rounded shadow-md flex justify-between items-center"
            >
              <div>
                <p><strong>Profesional:</strong> {appt.professional?.name || "Desconocido"}</p>
                <p><strong>Fecha:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                <p><strong>Horario:</strong> {appt.time}</p>
                <p><strong>Estado:</strong>{" "}
                  <span className={
                    appt.status === "cancelado"
                      ? "text-red-600 font-semibold"
                      : "text-green-600 font-semibold"
                  }>
                    {appt.status}
                  </span>
                </p>
              </div>
              {appt.status !== "cancelado" && (
                <button
                  onClick={() => cancelAppointment(appt._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  disabled={canceling === appt._id}
                >
                  {canceling === appt._id ? "Cancelando..." : "Cancelar"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
