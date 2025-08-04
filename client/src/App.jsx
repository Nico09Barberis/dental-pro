import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/*
      <Route path="/" element={<Home />} />
      */}

      {/* Ruta protegida */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
