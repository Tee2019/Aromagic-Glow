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
  _id: string;
  user: string;
  items: {
    product: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
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