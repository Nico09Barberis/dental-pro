import AppointmentForm from "../components/BookAppointment";

const AppointmentPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agendar Turno</h1>
      <AppointmentForm />
    </div>
  );
};

export default AppointmentPage;
