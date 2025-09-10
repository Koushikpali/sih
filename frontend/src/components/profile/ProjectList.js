export default function ProjectList({ projects = [] }) {
  return (
    <div className="space-y-2">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-lg">{project.title}</h3>
            <p>{project.description}</p>
            <p className="text-sm text-gray-500">Tech: {project.techStack}</p>
            {project.github && <a href={project.github} className="text-blue-500">GitHub</a>}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects yet</p>
      )}
    </div>
  );
}
