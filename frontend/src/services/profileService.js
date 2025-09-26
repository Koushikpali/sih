import apiClient from './apiClient';

export const getProfile = async (userId) => {
  const response = await apiClient.get(`/api/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profileData) => {
  const response = await apiClient.put(`/api/profile/${userId}`, profileData);
  return response.data;
};