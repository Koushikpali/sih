import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  return { user, setUser, token, setToken };
};
