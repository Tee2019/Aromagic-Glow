export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isBestseller: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface CustomCandle {
  _id?: string;
  size: 'small' | 'medium' | 'large';
  container: string;
  scents: string[];
  color: string;
  message?: string;
  basePrice: number;
  finalPrice?: number;
  userId?: string;
}