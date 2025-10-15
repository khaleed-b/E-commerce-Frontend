import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, productsApi, ordersApi, userApi } from '../services/apiEndpoints';
import type { 
  LoginRequest, 
  RegisterRequest, 
  ProductFormData, 
  UserProfileFormData,
  ProductFilters,
  PaginationParams
} from '@/types';
import toast from 'react-hot-toast';

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Registration failed');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return () => {
    authApi.logout();
    queryClient.clear();
    toast.success('Logged out successfully');
  };
};

// User hooks
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile,
    enabled: !!localStorage.getItem('access_token'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Update failed');
    },
  });
};

// Products hooks
export const useProducts = (params?: PaginationParams & ProductFilters) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Creation failed');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) => 
      productsApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.setQueryData(['product', data.id], data);
      toast.success('Product updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Update failed');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Deletion failed');
    },
  });
};

// Orders hooks
export const useOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => ordersApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ordersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order placed successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Order failed');
    },
  });
};


