import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setToken("mock-token"); // mock login
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />
        <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-2 rounded-full hover:scale-105 shadow-md transition-transform duration-300">
          Login
        </button>
      </form>
    </div>
  );
}
