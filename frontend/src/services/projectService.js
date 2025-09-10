export const getProjects = async () => {
  return [
    { title: "StudentHub", description: "Dashboard app", techStack: "React, Tailwind", github: "#" },
    { title: "Portfolio", description: "My portfolio website", techStack: "React, CSS", github: "#" }
  ];
};

export const createProject = async (project) => {
  console.log("Create project:", project);
  return { success: true };
};
