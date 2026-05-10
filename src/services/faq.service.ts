import api from './api';

export const faqService = {
  async getAllFAQs(params: { page?: number; limit?: number } = {}) {
    const response = await api.get('/faqs', { params });
    return response.data;
  },

  async createFAQ(data: { question: string; answer: string; category?: string; order?: number }) {
    const response = await api.post('/faqs', data);
    return response.data;
  },

  async updateFAQ(id: string, data: any) {
    const response = await api.patch(`/faqs/${id}`, data);
    return response.data;
  },

  async deleteFAQ(id: string) {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  }
};
