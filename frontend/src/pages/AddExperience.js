import { useState } from "react";
import Navbar from "../components/common/Navbar";
import { addExperience } from "../services/experienceService";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AddExperience() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("internship");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addExperience({ title, type, duration, description });
      showModal("Success", "Experience added successfully!");
      setTitle(""); setType("internship"); setDuration(""); setDescription("");
    } catch (err) {
      showModal("Error", err.response?.data?.message || "Failed to add experience.");
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
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.5 },
              bubble: { distance: 150, size: 6, duration: 0.3, opacity: 1 },
              push: { quantity: 3 },
            },
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
            twinkle: { particles: { enable: true, frequency: 0.02, opacity: 1 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <Navbar />

      {/* Experience Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 max-w-md mx-auto mt-12 border border-white/20 hover:scale-105 transition-transform duration-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Add Experience</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="internship">Internship</option>
          <option value="hackathon">Hackathon</option>
          <option value="award">Award</option>
          <option value="competition">Competition</option>
          <option value="club_activity">Club Activity</option>
          <option value="community_service">Community Service</option>
        </select>

        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 rounded-full hover:scale-105 shadow-md transition-transform duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Experience"}
        </button>
      </form>
    </div>
  );
}
