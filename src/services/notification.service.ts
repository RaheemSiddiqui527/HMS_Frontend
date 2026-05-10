import api from './api';

export const notificationService = {
  async getNotifications(params: Record<string, unknown> = {}) {
    const response = await api.get('/notifications/list', { params });
    return response.data;
  },

  async markAsRead(notificationId: string) {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  async markAllAsRead() {
    const response = await api.patch('/notifications/read-all');
    return response.data;
  },

  async deleteNotification(notificationId: string) {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  async sendBroadcast(data: { title: string; message: string; type?: string; recipientRole?: string }) {
    // Uses the custom email+notification endpoint for broadcast
    const response = await api.post('/email/notify', {
      templateType: 'custom',
      recipientType: data.recipientRole ? 'role' : 'all',
      ...(data.recipientRole && { role: data.recipientRole }),
      title: data.title,
      message: data.message,
      subject: data.title,
      emoji: '📢',
      badgeText: 'System Broadcast',
      badgeColor: '#2563eb',
    });
    return response.data;
  },

  async createTemplate(data: { name: string; content: string }) {
    const response = await api.post('/notifications/template/create', data);
    return response.data;
  },

  async getTemplates() {
    const response = await api.get('/notifications/template/list');
    return response.data;
  },

  async deleteTemplate(templateId: string) {
    const response = await api.delete(`/notifications/template/${templateId}`);
    return response.data;
  },

  async getAllNotificationsAdmin(params: Record<string, unknown> = {}) {
    const response = await api.get('/admin/notifications', { params });
    return response.data;
  },
};
