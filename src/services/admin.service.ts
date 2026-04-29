import api from './api';

export const adminService = {
  /**
   * Get dashboard statistics
   */
  async getStats() {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  /**
   * User Management: Get all users with filters
   */
  async getAllUsers(params: { role?: string; status?: string; page?: number; limit?: number; search?: string } = {}) {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  /**
   * User Management: Get user by ID
   */
  async getUserById(userId: string) {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  /**
   * User Management: Update user status
   */
  async updateUserStatus(userId: string, status: 'active' | 'inactive' | 'pending') {
    const response = await api.patch(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  /**
   * User Management: Delete user
   */
  async deleteUser(userId: string, hardDelete: boolean = false) {
    const response = await api.delete(`/admin/users/${userId}`, { params: { hardDelete } });
    return response.data;
  },

  /**
   * Resource Management: Create new Doctor
   */
  async createDoctor(doctorData: any) {
    const response = await api.post('/admin/doctors', doctorData);
    return response.data;
  },

  /**
   * Resource Management: Create new Staff
   */
  async createStaff(staffData: any) {
    const response = await api.post('/admin/staff', staffData);
    return response.data;
  },
};
