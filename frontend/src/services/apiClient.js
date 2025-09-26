// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Request config before token:', config);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token attached:', token);
    }
    console.log('Final request config:', config);
    return config;
  },
  (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
  }
);

// Log all responses
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.log('Response error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
