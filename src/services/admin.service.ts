import { API_URL } from './auth.service';

/**
 * Utility to get common headers including authentication token
 */
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const adminService = {
  /**
   * Get dashboard statistics
   */
  async getStats() {
    const res = await fetch(`${API_URL}/admin/stats`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch statistics');
    return data;
  },

  /**
   * User Management: Get all users with filters
   */
  async getAllUsers(params: { role?: string; status?: string; page?: number; limit?: number; search?: string } = {}) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_URL}/admin/users?${query}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
  },

  /**
   * User Management: Get user by ID
   */
  async getUserById(userId: string) {
    const res = await fetch(`${API_URL}/admin/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
    return data;
  },

  /**
   * User Management: Update user status
   */
  async updateUserStatus(userId: string, status: 'active' | 'inactive' | 'pending') {
    const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user status');
    return data;
  },

  /**
   * User Management: Delete user
   */
  async deleteUser(userId: string, hardDelete: boolean = false) {
    const res = await fetch(`${API_URL}/admin/users/${userId}?hardDelete=${hardDelete}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete user');
    return data;
  },

  /**
   * Resource Management: Create new Doctor
   */
  async createDoctor(doctorData: any) {
    const res = await fetch(`${API_URL}/admin/doctors`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(doctorData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create doctor');
    return data;
  },

  /**
   * Resource Management: Create new Staff
   */
  async createStaff(staffData: any) {
    const res = await fetch(`${API_URL}/admin/staff`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(staffData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create staff');
    return data;
  },
};
