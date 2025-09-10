import { useState } from "react";
import Button from "../common/Button";

export default function ProjectForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, techStack, github }); // frontend placeholder
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Tech Stack (comma separated)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <input
        type="url"
        placeholder="GitHub Link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <Button type="submit" className="w-full">Add Project</Button>
    </form>
  );
}
