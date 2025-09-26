export default function ProjectList({ projects = [] }) {
  return (
    <div className="space-y-4">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105">
            <h3 className="font-bold text-xl text-gray-900">{project.title}</h3>
            <p className="text-gray-700 mt-2">{project.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-semibold">Tech Stack:</span> {project.techStack}
            </p>
            {project.github && (
              <a
                href={project.github}
                className="text-cyan-600 hover:text-cyan-800 transition-colors duration-300 inline-block mt-3 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Link
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No projects added yet.</p>
      )}
    </div>
  );
}