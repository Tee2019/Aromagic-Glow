import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import RegisterForm from '../components/RegisterForm';
import OrderHistory from '../components/profile/OrderHistory';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';
import { orderService } from '../services/order.service';
import { Order } from '../types';
import { Alert, CircularProgress } from '@mui/material';

type AuthView = 'login' | 'register' | 'forgot-password';

export default function Profile() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        setOrderLoading(true);
        setOrderError(null);
        const userOrders = await orderService.getUserOrders();
        setOrders(userOrders);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        setOrderError(error.message || 'Failed to fetch order history');
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // If loading, show loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // If not logged in, show auth forms
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow">
          {authView === 'forgot-password' ? (
            <>
              <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
              <ForgotPasswordForm onCancel={() => setAuthView('login')} />
            </>
          ) : (
            <>
              <div className="flex justify-between mb-8">
                <button
                  className={`text-lg font-semibold ${
                    authView === 'login' ? 'text-purple-600' : 'text-gray-600'
                  }`}
                  onClick={() => setAuthView('login')}
                >
                  Login
                </button>
                <button
                  className={`text-lg font-semibold ${
                    authView === 'register' ? 'text-purple-600' : 'text-gray-600'
                  }`}
                  onClick={() => setAuthView('register')}
                >
                  Register
                </button>
              </div>
              {authView === 'login' ? (
                <LoginForm onForgotPassword={() => setAuthView('forgot-password')} />
              ) : (
                <RegisterForm />
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <button
              onClick={() => navigate('/wishlist')}
              className="text-purple-600 hover:text-purple-700"
            >
              View Wishlist
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orderError && (
            <Alert severity="error" className="mb-4">
              {orderError}
            </Alert>
          )}
          {orderLoading ? (
            <div className="flex justify-center py-8">
              <CircularProgress />
            </div>
          ) : (
            <OrderHistory orders={orders} />
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}