import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ usamos la función del contexto

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form);

      if (res.token) {
        login(res); // ✅ usamos la función que ya guarda token y user
        navigate("/dashboard");
      } else {
        setError(res.msg || "Login failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
        <p className="text-sm mt-4 text-center">
          ¿no tenés cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            registrate aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
