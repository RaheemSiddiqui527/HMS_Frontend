import api from './api';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const authService = {
  /**
   * Primary Login handler mapped exactly to the active backend POST route.
   */
  async login(credentials: Record<string, any>) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Unified Registration handler communicating with the backend register POST route.
   */
  async register(registrationData: Record<string, any>) {
    const response = await api.post('/auth/register', registrationData);
    return response.data;
  },

  /**
   * Helper to decode current user from token
   */
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error("Failed to revoke session on server", e);
    }
    localStorage.removeItem('token');
  },

  async getSessions() {
    const response = await api.get('/auth/sessions');
    return response.data.data;
  },

  async revokeSession(sessionId: string) {
    const response = await api.delete(`/auth/sessions/${sessionId}`);
    return response.data;
  },

  async revokeAllOtherSessions() {
    const response = await api.delete('/auth/sessions');
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/user/profile');
    return response.data;
  }
};