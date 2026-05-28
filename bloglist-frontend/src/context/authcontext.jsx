// context/AuthContext.jsx
import { createContext, useState } from "react";
import { setToken } from "../services/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
