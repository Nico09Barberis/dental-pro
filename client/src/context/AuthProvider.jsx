import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { fetchMe } from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
  const loadUser = async () => {
    if (token) {
      const res = await fetchMe(token);
      if (!res.msg) {
        setUser(res);
      } else {
        console.log("Auth error:", res.msg);
      }
    }
  };
  loadUser();
}, [token]);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
