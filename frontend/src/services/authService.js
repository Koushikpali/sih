import apiClient from './apiClient';

export const login = async (email, password) => {
  console.log('Login called with:', { email, password });

  // Add /api prefix to match backend
  const response = await apiClient.post('/api/auth/login', { email, password });

  console.log('Login response:', response);

  // Save JWT token in localStorage
  if (response.data.token) {
    console.log('Saving token to localStorage:', response.data.token);
    localStorage.setItem('token', response.data.token);
  }

  console.log('Returning response data:', response.data);
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/api/auth/register', userData);
  return response.data;
};

export const logout = async () => {
  // The token is now handled by the interceptor, but we can call a logout endpoint if needed
  await apiClient.post('/api/auth/logout');
  localStorage.removeItem('token');
};