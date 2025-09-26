import apiClient from './apiClient';

// For the data visualization dashboard tab
// ➡️ This service fetches all key stats for the admin dashboard.
// export const getDashboardStats = async () => {
//   const response = await apiClient.get('/admin/stats');
//   return response.data;
// };

// For the "Find Student" dashboard tab
export const findStudent = async (query) => {
  const response = await apiClient.get(`/api/admin/find-student?query=${query}`);
  return response.data;
};

// For the "Pending Requests" dashboard tab
export const getPendingRequests = async () => {
  const response = await apiClient.get('/api/admin/pending-requests');
  return response.data;
};

export const updateRequestStatus = async (type, id, status) => {
  const response = await apiClient.put('/api/admin/update-request', { type, id, status });
  return response.data;
};