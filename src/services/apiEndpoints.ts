import apiClient from './api';
import type { 
  User, 
  Product, 
  Order, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  PaginatedResponse, 
  ProductFormData,
  UserProfileFormData,
  ProductFilters,
  PaginationParams
} from '@/types';

// Authentication API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: PaginationParams & ProductFilters): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get('/products/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData: ProductFormData): Promise<Product> => {
    const response = await apiClient.post('/products/', productData);
    return response.data;
  },

  update: async (id: number, productData: ProductFormData): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};

// Orders API
export const ordersApi = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get('/orders/', { params });
    return response.data;
  },

  create: async (orderData: { items: Array<{ product_id: number; quantity: number }> }): Promise<Order> => {
    const response = await apiClient.post('/orders/', orderData);
    return response.data;
  },
};

// User API
export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData: UserProfileFormData): Promise<User> => {
    const response = await apiClient.put('/users/profile', userData);
    return response.data;
  },
};


