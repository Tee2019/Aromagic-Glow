import api from './api';

interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      return {
        id: data._id,
        name: data.name,
        email: data.email,
        token: data.token
      };
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Invalid email or password';
      throw new Error(message);
    }
  },

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/api/users/register', { name, email, password });
      localStorage.setItem('token', data.token);
      return {
        id: data._id,
        name: data.name,
        email: data.email,
        token: data.token
      };
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  },

  async getUserProfile(): Promise<User> {
    try {
      const { data } = await api.get<Omit<AuthResponse, 'token'>>('/api/users/profile');
      return {
        id: data._id,
        name: data.name,
        email: data.email,
        token: localStorage.getItem('token') || ''
      };
    } catch (error: any) {
      console.error('Get user profile error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Failed to get user profile';
      throw new Error(message);
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};