import Navbar from "../components/common/Navbar";

export default function Projects() {
  const projects = [
    { title: "StudentHub", description: "Dashboard app", techStack: "React, Tailwind" },
    { title: "Portfolio", description: "Personal portfolio website", techStack: "React, CSS" },
    { title: "Blog App", description: "Blog platform", techStack: "React, Node.js" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto space-y-6 bg-cyan-50 rounded-3xl shadow-lg mt-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">My Projects</h1>

        {projects.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-inner transition-transform duration-300"
          >
            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-4"></div>
            <h2 className="font-semibold text-gray-900 text-xl mb-2">{p.title}</h2>
            <p className="text-gray-700 mb-1">{p.description}</p>
            <p className="text-sm text-gray-500">Tech: {p.techStack}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
