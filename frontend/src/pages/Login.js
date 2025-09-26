import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";
import Button from "../components/common/Button";
import { showModal } from "../utils/modal";
import { jwtDecode } from "jwt-decode";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Spline viewer script
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.70/build/spline-viewer.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token: newToken } = await login(email, password);
      setToken(newToken);

      const decoded = jwtDecode(newToken);
      const role = decoded.role;

      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      showModal(
        "Login Failed",
        err.response?.data?.message ||
          err.message ||
          "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen bg-[#0b1020] text-white items-center justify-center p-6 overflow-hidden">
      {/* Particles Background */}
        <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#000000" } },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            number: { value: 200, density: { enable: true, area: 800 } },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 0.05,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Gradient mask to fade out stars at bottom */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-b from-transparent via-black/80 to-black"></div>


      {/* Top gradient for sky fade */}
      <div
        className="absolute top-0 left-0 w-full h-1/3 pointer-events-none z-5"
        style={{
          background: "linear-gradient(to bottom, #0b1020 0%, transparent 100%)",
        }}
      />

      {/* Fake "floor" gradient to cover Spline footer */}
    <div
  className="absolute left-0 w-full h-40 z-20 pointer-events-none"
  style={{
    background: "black", // completely black floor
    bottom: "-20px",     // move it a bit lower than the bottom
  }}
/>


      {/* Login Card */}
      <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg p-6 w-full max-w-sm mb-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white focus:outline-none"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Spline Viewer */}
      <div className="relative z-10 w-full max-w-3xl h-[32rem] mt-4">
        <spline-viewer
          url="https://prod.spline.design/UJK3PYkSf2lMAJFv/scene.splinecode"
          style={{ width: "100%", height: "100%", borderRadius: "12px" }}
          title="3D Robot Scene"
        ></spline-viewer>
      </div>
    </div>
  );
}
