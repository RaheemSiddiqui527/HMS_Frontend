import { API_URL } from './auth.service';
import { getAuthHeaders, handleResponse } from './api.utils';

export const appointmentService = {
  /**
   * Get appointments with filters
   */
  async getAppointments(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/appointments/list?${query}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Get all available doctors for booking
   */
  async getDoctors(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/appointments/doctors?${query}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Create a new appointment
   */
  async createAppointment(appointmentData: any) {
    const res = await fetch(`${API_URL}/appointments/book`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    return handleResponse(res);
  },

  /**
   * Update appointment status (e.g., scheduled -> completed, canceled)
   */
  async updateStatus(appointmentId: string, status: string) {
    const res = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  /**
   * Get specific appointment details
   */
  async getAppointmentById(id: string) {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  /**
   * Get doctor's specific patients
   */
  async getMyPatients() {
    const res = await fetch(`${API_URL}/appointments/my-patients`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  }
};
