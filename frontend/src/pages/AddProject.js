import { useState } from "react";
import Navbar from "../components/common/Navbar";
import { createProject } from "../services/projectService";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProject = { title, description, techStack, github };
      await createProject(newProject);
      showModal("Success", "Project added successfully!");
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithub("");
    } catch (err) {
      showModal("Error", err.response?.data?.message || "Failed to add project.");
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
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.3,
                sync: false,
              },
            },
            size: { value: { min: 2, max: 6 }, random: true },
            links: {
              enable: true,
              distance: 140,
              color: "#6aa1ff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
            shadow: { enable: true, color: "#6aa1ff", blur: 6 },
            twinkle: { particles: { enable: true, frequency: 0.02, opacity: 1 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <Navbar />

      {/* Project Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-lg 
                   border border-white/20 max-w-md mx-auto mt-12 
                   hover:scale-105 transition-transform duration-300"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">
          Add Project
        </h1>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-transparent text-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-transparent text-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="text"
          placeholder="Tech Stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-transparent text-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="url"
          placeholder="GitHub Link (optional)"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="border p-2 mb-6 w-full rounded-md bg-transparent text-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-400 to-purple-600 
                     text-white py-2 rounded-full shadow-md 
                     hover:scale-105 transition-transform duration-300 
                     disabled:opacity-50"
        >
          {loading ? "Adding Project..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
