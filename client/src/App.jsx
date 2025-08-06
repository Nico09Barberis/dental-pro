import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Lgn";
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AppointmentPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MyAppointments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
