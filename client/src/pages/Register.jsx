import { useState, useContext } from "react";
import { registerUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "paciente" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res.token) {
      login(res);
      navigate("/dashboard");
    } else {
      alert(res.msg || "Register failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
        <option value="paciente">Paciente</option>
        <option value="dentista">Dentista</option>
      </select>
      <button type="submit" className="btn mt-4">Register</button>
    </form>
  );
}
