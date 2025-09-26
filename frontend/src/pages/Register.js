import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService"; // your current register export
import Button from "../components/common/Button";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: "",
    year: "",
    skills: "",
    resumeLink: "",
    portfolioLink: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { 
        ...form, 
        skills: form.skills.split(",").map((s) => s.trim()) 
      };
      await register(payload);
      showModal("Success", "Registration successful!");
      navigate("/login");
    } catch (err) {
      showModal(
        "Registration Failed",
        err.response?.data?.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
     <div className="relative min-h-screen bg-gradient-to-br from-[#0b1020] via-[#121838] to-[#1b214a] overflow-hidden">
          {/* Glowing particles */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: ["repulse", "bubble"] },
                  onClick: { enable: true, mode: "push" },
                  resize: true
                },
                modes: {
                  repulse: { distance: 120, duration: 0.5 },
                  bubble: { distance: 150, size: 6, duration: 0.3, opacity: 1 },
                  push: { quantity: 3 }
                }
              },
              particles: {
                number: { value: 70, density: { enable: true, area: 900 } },
                color: { value: ["#6aa1ff", "#63e", "#9b59b6", "#ef4444"] },
                shape: { type: "circle" },
                opacity: { value: 0.6, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false } },
                size: { value: { min: 2, max: 6 }, random: true },
                links: { enable: true, distance: 140, color: "#6aa1ff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: { default: "out" } },
                shadow: { enable: true, color: "#6aa1ff", blur: 6 },
                twinkle: { particles: { enable: true, frequency: 0.02, opacity: 1 } }
              },
              detectRetina: true
            }}
            className="absolute inset-0 z-0"
          />
    

      {/* Registration Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
  <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
    <h1 className="text-2xl font-bold mb-6 text-center text-white">Register</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="w-full border border-white/30 bg-transparent text-white placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border border-white/30 bg-transparent text-white placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full border border-white/30 bg-transparent text-white placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border border-white/30 bg-transparent text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
        <option value="college">College</option>
        <option value="club">Club</option>
      </select>

      <input
        type="text"
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
        className="w-full border border-white/30 bg-transparent text-white placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        type="number"
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full border border-white/30 bg-transparent text-white placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        type="text"
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills (comma separated)"
        className="w-full border border-white/30 bg-transparent text-white placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>

    <p className="mt-4 text-center text-gray-300">
      Already have an account?{" "}
      <Link to="/login" className="text-purple-400 hover:underline">
        Login
      </Link>
    </p>
  </div>
</div>

    </div>
  );
}
