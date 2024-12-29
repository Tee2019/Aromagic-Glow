import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, User } from '../services/auth.service';
import { CartService } from '../services/cart.service';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const cartService = CartService.getInstance();

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const userData = await authService.getUserProfile();
          setToken(storedToken);
          setUser(userData);
        } catch (err) {
          console.error('Error loading user:', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          navigate('/login');
        }
      }
      setIsLoading(false);
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, navigate]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authService.login(email, password);
      localStorage.setItem('token', userData.token);
      setToken(userData.token);
      setUser(userData);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authService.register(name, email, password);
      localStorage.setItem('token', userData.token);
      setToken(userData.token);
      setUser(userData);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear cart before logging out
      cartService.clearCart().catch(error => {
        console.error('Error clearing cart during logout:', error);
      });
    } finally {
      // Always clear local auth state
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      navigate('/login');
    }
  };

  const value = {
    isAuthenticated: !!token && !!user,
    token,
    user,
    login,
    register,
    logout,
    isLoading,
    error
  };

  if (!isInitialized) {
    return <div>Initializing...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const useAuth = useAuthContext;