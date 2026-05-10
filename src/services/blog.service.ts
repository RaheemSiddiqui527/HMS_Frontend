import api from './api';

export const blogService = {
  async getAllBlogs(params: { category?: string; status?: 'published' | 'draft' | 'all'; page?: number; limit?: number } = {}) {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  async getBlogBySlug(slug: string) {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  },

  async createBlog(blogData: any) {
    const response = await api.post('/blogs', blogData);
    return response.data;
  },

  async updateBlog(blogId: string, blogData: any) {
    const response = await api.patch(`/blogs/${blogId}`, blogData);
    return response.data;
  },

  async deleteBlog(blogId: string) {
    const response = await api.delete(`/blogs/${blogId}`);
    return response.data;
  }
};
