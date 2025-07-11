import { Product } from '../types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones Pro',
    price: 199.99,
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and crystal-clear audio quality.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 1247,
    returnRate: 0.08,
    tags: ['wireless', 'noise-canceling', 'premium'],
    riskFactors: {
      sizingIssues: 5,
      qualityIssues: 3,
      expectationMismatch: 8,
      shippingDamage: 2
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299.99,
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Water resistant up to 50m.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    rating: 4.2,
    reviews: 892,
    returnRate: 0.15,
    tags: ['fitness', 'smartwatch', 'waterproof'],
    riskFactors: {
      sizingIssues: 20,
      qualityIssues: 8,
      expectationMismatch: 12,
      shippingDamage: 3
    }
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Sustainable and comfortable organic cotton t-shirt. Perfect for everyday wear with a relaxed fit.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 2156,
    returnRate: 0.22,
    tags: ['organic', 'cotton', 'casual'],
    riskFactors: {
      sizingIssues: 35,
      qualityIssues: 5,
      expectationMismatch: 15,
      shippingDamage: 1
    }
  },
  {
    id: '4',
    name: 'Premium Coffee Maker',
    price: 149.99,
    description: 'Professional-grade coffee maker with programmable settings and thermal carafe. Makes perfect coffee every time.',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 743,
    returnRate: 0.06,
    tags: ['coffee', 'kitchen', 'programmable'],
    riskFactors: {
      sizingIssues: 2,
      qualityIssues: 4,
      expectationMismatch: 6,
      shippingDamage: 8
    }
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    description: 'RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and professional typing.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 567,
    returnRate: 0.11,
    tags: ['gaming', 'mechanical', 'rgb'],
    riskFactors: {
      sizingIssues: 3,
      qualityIssues: 12,
      expectationMismatch: 10,
      shippingDamage: 5
    }
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    price: 79.99,
    description: 'Extra thick yoga mat with superior grip and cushioning. Made from eco-friendly materials.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1506629905607-c5533c2d1861?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1834,
    returnRate: 0.04,
    tags: ['yoga', 'fitness', 'eco-friendly'],
    riskFactors: {
      sizingIssues: 1,
      qualityIssues: 2,
      expectationMismatch: 3,
      shippingDamage: 4
    }
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    price: 39.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop',
    rating: 4.3,
    reviews: 421,
    returnRate: 0.09,
    tags: ['wireless', 'charging', 'qi'],
    riskFactors: {
      sizingIssues: 2,
      qualityIssues: 8,
      expectationMismatch: 9,
      shippingDamage: 6
    }
  },
  {
    id: '8',
    name: 'Running Shoes Elite',
    price: 159.99,
    description: 'High-performance running shoes with advanced cushioning technology and breathable mesh upper.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    rating: 4.1,
    reviews: 698,
    returnRate: 0.28,
    tags: ['running', 'shoes', 'performance'],
    riskFactors: {
      sizingIssues: 45,
      qualityIssues: 8,
      expectationMismatch: 18,
      shippingDamage: 2
    }
  }
];