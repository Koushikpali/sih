// export const getLeaderboard = async () => {
//   return [
//     { name: "Anjali", points: 120 },
//     { name: "Geet", points: 100 },
//     { name: "Anu", points: 80 }
//   ];
// };
import apiClient from './apiClient';

export const getLeaderboard = async () => {
  const response = await apiClient.get('/api/gamification');
  return response.data;
};

export const getUserStats = async (userId) => {
  const response = await apiClient.get(`/api/gamification/${userId}`);
  return response.data;
};
