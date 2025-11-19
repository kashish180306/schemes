import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'https://schemeshub-backend.vercel.app';

export interface Scheme {
  _id: string;
  name: string;
  category: string;
  details: string;
  content: string;
  link: string;
  imageUrl: string;
  imageKey: string;
  createdAt: string;
}

export interface SchemesResponse {
  data: Scheme[];
  page: number;
  limit: number;
  total: number;
}

export const api = {
  async getSchemes(page = 1, limit = 20): Promise<SchemesResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/schemes`, {
      params: { page, limit }
    });
    return response.data;
  },

  async getScheme(id: string): Promise<Scheme> {
    const response = await axios.get(`${API_BASE_URL}/api/schemes/${id}`);
    return response.data;
  },

  async createScheme(formData: FormData): Promise<Scheme> {
    const response = await axios.post(`${API_BASE_URL}/api/schemes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async updateScheme(id: string, formData: FormData): Promise<Scheme> {
    const response = await axios.put(`${API_BASE_URL}/api/schemes/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async deleteScheme(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/api/schemes/${id}`);
  }
};
