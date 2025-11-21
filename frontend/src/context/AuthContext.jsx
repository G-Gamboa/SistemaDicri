import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    const storedToken = window.localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data.user);
    window.localStorage.setItem("user", JSON.stringify(res.data.user));
    window.localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
