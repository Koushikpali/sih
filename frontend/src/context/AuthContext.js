import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // named import
import apiClient from "../services/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  console.log("AuthProvider Rendered");
  console.log("user:", user);
  console.log("token:", token);
  console.log("loading:", loading);

  useEffect(() => {
    console.log("useEffect triggered with token:", token);
    const loadUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token); // works now
          console.log("Decoded token:", decoded);
        const response = await apiClient.get(`/api/profile/${decoded.id}`);
          console.log("API response:", response);
          setUser(response.data.profile); 
        } catch (error) {
          console.error("Failed to load user data:", error);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
      console.log("Loading set to false");
    };

    loadUser();
  }, [token]);

  const authContextValue = {
    user,
    setUser,
    token,
    setToken,
    loading,
  };

  console.log("authContextValue:", authContextValue);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
