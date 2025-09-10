import Navbar from "../components/common/Navbar";
import { useState } from "react";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Project added (frontend placeholder)");
    setTitle(""); setDescription(""); setTechStack(""); setGithub("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-6 max-w-md mx-auto mt-8 border border-transparent hover:border-cyan-400 hover:scale-105 transition-transform duration-300"
      >
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-6"></div>
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Add Project</h1>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />

        <input
          type="text"
          placeholder="Tech Stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />

        <input
          type="url"
          placeholder="GitHub Link (optional)"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="border p-2 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-2 rounded-full hover:scale-105 shadow-md transition-transform duration-300">
          Add Project
        </button>
      </form>
    </div>
  );
}
