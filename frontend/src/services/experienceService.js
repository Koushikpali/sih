import apiClient from "./apiClient"; // your configured axios instance

// Helper to get Authorization header
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Add experience
export const addExperience = async (experienceData) => {
  try {
    // Detect if it's FormData
    const isFormData = experienceData instanceof FormData;

    const response = await apiClient.post("/experiences", experienceData, {
      headers: {
        ...authHeader(),
        "Content-Type": isFormData ? undefined : "application/json", 
        // Let browser set Content-Type for FormData
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding experience:", error.response?.data || error.message);
    throw error;
  }
};

// Get all experiences for a user
export const getExperiences = async (userId) => {
  try {
    const response = await apiClient.get(`/api/experiences/${userId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching experiences:", error.response?.data || error.message);
    throw error;
  }
};
