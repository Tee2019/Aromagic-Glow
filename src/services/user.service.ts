import api from './api';
import { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    try {
      const { data } = await api.post('/api/users/login', credentials);
      return data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  async register(userData: RegisterData): Promise<{ token: string; user: User }> {
    try {
      const { data } = await api.post('/api/users/register', userData);
      return data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  },

  async changePassword(passwordData: ChangePasswordData): Promise<{ message: string }> {
    try {
      const { data } = await api.put('/api/users/change-password', passwordData);
      return data;
    } catch (error: any) {
      console.error('Change password error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }
}; 