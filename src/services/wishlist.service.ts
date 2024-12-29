import api from './api';

export const wishlistService = {
  async getWishlist() {
    const { data } = await api.get('/wishlist');
    return data;
  },

  async addToWishlist(productId: string) {
    const { data } = await api.post(`/wishlist/${productId}`);
    return data;
  },

  async removeFromWishlist(productId: string) {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data;
  }
};