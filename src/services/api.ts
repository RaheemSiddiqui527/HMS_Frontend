import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const message = data?.message || 'Something went wrong';
    
    // If there are specific validation errors, collect them
    let detailedMessage = message;
    if (data?.errors && typeof data.errors === 'object') {
      const errorDetails = Object.values(data.errors).join(', ');
      detailedMessage = `${message}: ${errorDetails}`;
    }

    console.error('API Error:', detailedMessage);
    return Promise.reject(new Error(detailedMessage));
  }
);

export default api;
