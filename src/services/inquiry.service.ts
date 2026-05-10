import api from './api';

export const inquiryService = {
  async submitInquiry(data: { fullName: string; email: string; phoneNumber: string; department: string; message: string }) {
    const response = await api.post('/inquiries/submit', data);
    return response.data;
  },

  async getAllInquiries(params: { page?: number; limit?: number; status?: string } = {}) {
    const response = await api.get('/inquiries', { params });
    return response.data;
  },

  async updateInquiryStatus(id: string, status: string) {
    const response = await api.patch(`/inquiries/${id}/status`, { status });
    return response.data;
  }
};
