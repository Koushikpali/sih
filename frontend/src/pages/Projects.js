import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../hooks/useAuth";
import { getProjects, updateProject, deleteProject } from "../services/projectService";
import Loader from "../components/common/Loader";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", techStack: "" });

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const result = await getProjects(user._id);
        const fetchedProjects = Array.isArray(result) ? result : result.projects || [];
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        showModal("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setEditData({ title: project.title, description: project.description, techStack: project.techStack });
  };

  const handleUpdate = async (projectId) => {
    try {
      const updated = await updateProject(projectId, editData);
      setProjects(projects.map(p => (p._id === projectId ? updated : p)));
      setEditingId(null);
      showModal("Success", "Project updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      showModal("Error", "Failed to update project");
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(projectId);
      setProjects(projects.filter(p => p._id !== projectId));
      showModal("Success", "Project deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      showModal("Error", "Failed to delete project");
    }
  };

  const particlesInit = async (engine) => await loadFull(engine);

  if (loading) return <Loader />;

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

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          My Projects
        </h1>

        {projects.length === 0 && (
          <p className="text-center text-white">No projects found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300"
            >
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400 rounded-t-3xl mb-4"></div>

              {editingId === p._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full rounded-md border-gray-300 p-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Title"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full rounded-md border-gray-300 p-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={editData.techStack}
                    onChange={(e) => setEditData({ ...editData, techStack: e.target.value })}
                    className="w-full rounded-md border-gray-300 p-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Tech Stack"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUpdate(p._id)}
                      className="bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600 transition-colors shadow-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition-colors shadow-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-semibold text-white text-xl mb-2">{p.title}</h2>
                  <p className="text-white mb-1">{p.description}</p>
                  <p className="text-sm text-gray-500 mb-2">Tech: {p.techStack}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 shadow-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 shadow-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
