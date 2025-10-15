import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '@/utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock_quantity <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
    >
      <Link to={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors" title="Quick view">
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Stock Badge */}
          {product.stock_quantity <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(product.price)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.stock_quantity} in stock
              </p>
            </div>
            
            <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {product.category}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;


