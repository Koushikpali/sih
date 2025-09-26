// export const getProjects = async () => {
//   return [
//     { title: "StudentHub", description: "Dashboard app", techStack: "React, Tailwind", github: "#" },
//     { title: "Portfolio", description: "My portfolio website", techStack: "React, CSS", github: "#" }
//   ];
// };

// export const createProject = async (project) => {
//   console.log("Create project:", project);
//   return { success: true };
// };
import apiClient from './apiClient';

export const getProjects = async (userId) => {
  try {
    const response = await apiClient.get(`/api/projects/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};


export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post('/api/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/projects/${projectId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await apiClient.delete(`/api/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
