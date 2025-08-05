// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Bienvenido a DentalPro</h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        Un sistema inteligente para gestión de turnos odontológicos. Fácil de usar para pacientes y profesionales.
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </Link>
        <Link
          to="/login"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Home;
