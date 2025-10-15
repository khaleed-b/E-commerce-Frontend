// User interface matching backend model
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: 'customer' | 'admin';
  is_active: boolean;
}

// Product interface matching backend model
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Order interface matching backend model
export interface Order {
  id: number;
  customer_id: number;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

// Order item interface for cart/order details
export interface OrderItem {
  id?: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: Product;
}

// Authentication interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  full_name: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// API Response interfaces
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ApiError {
  detail: string;
  message?: string;
}

// Cart interfaces
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Form interfaces
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
}

export interface UserProfileFormData {
  email: string;
  username: string;
  full_name: string;
}

// Filter and search interfaces
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

// Theme interface
export interface Theme {
  mode: 'light' | 'dark';
}


