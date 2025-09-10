import RegisterForm from "../components/forms/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = ({ name, email, password, department }) => {
    // frontend placeholder: store token
    localStorage.setItem("token", "mock-token");
    navigate("/dashboard");
  };

  return <RegisterForm onRegister={handleRegister} />;
}
