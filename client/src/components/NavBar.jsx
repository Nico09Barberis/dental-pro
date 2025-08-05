import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="text-xl font-bold">DentalPro</div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span>Hola, {user.name}</span>
            {user.role === "dentista" && (
              <button onClick={() => navigate("/dashboard")} className="hover:underline">
                Dashboard
              </button>
            )}
            {/* Agregá más links según rol si querés */}
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
