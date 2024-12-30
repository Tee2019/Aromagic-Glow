import api from './api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  async submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const { data } = await api.post('/api/contact', formData);
      return data;
    } catch (error: any) {
      console.error('Contact form submission error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to submit contact form');
    }
  }
}; 