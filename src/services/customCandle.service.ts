import api from './api';
import { CustomCandle } from '../types';

export const customCandleService = {
  async createCustomCandle(candleData: Omit<CustomCandle, '_id'>) {
    const { data } = await api.post('/api/custom-candles', candleData);
    return data;
  },

  async getUserCustomCandles() {
    const { data } = await api.get('/api/custom-candles');
    return data;
  },

  async getCustomCandleById(id: string) {
    const { data } = await api.get(`/api/custom-candles/${id}`);
    return data;
  }
};