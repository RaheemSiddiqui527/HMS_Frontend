import { API_URL } from './auth.service';

/**
 * Common utility to get authentication headers from localStorage
 */
export const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Handle API responses and throw errors consistently
 */
export const handleResponse = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Operation failed');
  }
  return data;
};
