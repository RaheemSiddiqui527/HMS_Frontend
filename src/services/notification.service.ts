import { API_URL } from './auth.service';
import { getAuthHeaders, handleResponse } from './api.utils';

export const notificationService = {
  /**
   * Get all notifications for the current user
   */
  async getMyNotifications() {
    const res = await fetch(`${API_URL}/notifications/list`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Admin: Get all notifications (system wide)
   */
  async getAllNotifications(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/admin/notifications?${query}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: string) {
    const res = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Admin: Send a broadcast notification
   */
  async sendBroadcast(notificationData: { title: string, message: string, type: 'info' | 'warning' | 'error' | 'success', recipientRole?: string }) {
    const res = await fetch(`${API_URL}/admin/notifications/broadcast`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notificationData),
    });
    return handleResponse(res);
  },

  /**
   * Send a direct notification to a user
   */
  async sendNotification(notificationData: { recipientId: string, title: string, message: string, type?: string }) {
    const res = await fetch(`${API_URL}/notifications/send`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notificationData),
    });
    return handleResponse(res);
  },

  /**
   * Templates: Get all templates created by the current user
   */
  async getTemplates() {
    const res = await fetch(`${API_URL}/notifications/template/list`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Templates: Create a new notification template
   */
  async createTemplate(templateData: { name: string, content: string }) {
    const res = await fetch(`${API_URL}/notifications/template/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(templateData),
    });
    return handleResponse(res);
  },

  /**
   * Templates: Update an existing template
   */
  async updateTemplate(templateId: string, templateData: { name?: string, content?: string, isActive?: boolean }) {
    const res = await fetch(`${API_URL}/notifications/template/${templateId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(templateData),
    });
    return handleResponse(res);
  },

  /**
   * Templates: Delete a template
   */
  async deleteTemplate(templateId: string) {
    const res = await fetch(`${API_URL}/notifications/template/${templateId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  }
};
