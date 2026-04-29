import api from './api';

export const appointmentService = {
  /**
   * Get appointments with filters
   */
  async getAppointments(params: any = {}) {
    const response = await api.get('/appointments/list', { params });
    return response.data;
  },

  /**
   * Get all available doctors for booking
   */
  async getDoctors(params: any = {}) {
    const response = await api.get('/appointments/doctors', { params });
    return response.data;
  },

  /**
   * Create a new appointment
   */
  async createAppointment(appointmentData: any) {
    const response = await api.post('/appointments/book', appointmentData);
    return response.data;
  },

  /**
   * Update appointment status (e.g., scheduled -> completed, canceled)
   */
  async updateStatus(appointmentId: string, status: string) {
    const response = await api.patch(`/appointments/${appointmentId}/status`, { status });
    return response.data;
  },

  /**
   * Get specific appointment details
   */
  async getAppointmentById(id: string) {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  /**
   * Get doctor's specific patients
   */
  async getMyPatients() {
    const response = await api.get('/appointments/my-patients');
    return response.data;
  },

  /**
   * Check doctor availability for a specific date
   */
  async checkAvailability(doctorId: string, date: string) {
    const response = await api.get('/appointments/availability/check', {
      params: { doctorId, date }
    });
    return response.data;
  },

  /**
   * Get doctor's schedule for a specific date
   */
  async getSchedule(doctorId: string, date: string) {
    const response = await api.get('/appointments/schedule', {
      params: { doctorId, date }
    });
    return response.data;
  }
};
