import { API_URL } from './auth.service';
import { getAuthHeaders, handleResponse } from './api.utils';

export const notificationService = {
  async getNotifications(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/notifications/list?${query}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  async markAsRead(notificationId: string) {
    const res = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  async markAllAsRead() {
    const res = await fetch(`${API_URL}/notifications/read-all`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  async deleteNotification(notificationId: string) {
    const res = await fetch(`${API_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};
