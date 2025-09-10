import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Vrinda Gupta",
    department: "CSE",
    year: "5th",
  });
  const [token, setToken] = useState("mock-token"); // always logged in

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
