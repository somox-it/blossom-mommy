
import { Product } from '../types';

export const products: Product[] = [
  // Mom Essentials
  {
    id: '1',
    name: 'Prenatal Vitamins',
    description: 'Complete prenatal vitamin with folic acid, iron, and DHA',
    price: 29.99,
    category: 'mom',
    subcategory: 'Health & Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    inStock: true,
    rating: 4.8,
    reviews: 1250
  },
  {
    id: '2',
    name: 'Maternity Pillow',
    description: 'Full body pregnancy pillow for comfortable sleep',
    price: 49.99,
    category: 'mom',
    subcategory: 'Sleep & Comfort',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
    inStock: true,
    rating: 4.6,
    reviews: 890
  },
  {
    id: '3',
    name: 'Nursing Bras (3-pack)',
    description: 'Comfortable wireless nursing bras with easy clips',
    price: 39.99,
    category: 'mom',
    subcategory: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
    inStock: true,
    rating: 4.4,
    reviews: 567
  },
  {
    id: '4',
    name: 'Stretch Mark Cream',
    description: 'Natural stretch mark prevention and healing cream',
    price: 24.99,
    category: 'mom',
    subcategory: 'Skincare',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    inStock: true,
    rating: 4.3,
    reviews: 423
  },
  {
    id: '5',
    name: 'Maternity Leggings',
    description: 'High-waisted comfortable maternity leggings',
    price: 34.99,
    category: 'mom',
    subcategory: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400',
    inStock: true,
    rating: 4.7,
    reviews: 789
  },

  // Newborn Essentials
  {
    id: '6',
    name: 'Baby Onesies (5-pack)',
    description: 'Soft cotton onesies in various sizes',
    price: 19.99,
    category: 'newborn',
    subcategory: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400',
    inStock: true,
    rating: 4.9,
    reviews: 1456
  },
  {
    id: '7',
    name: 'Baby Bottles Set',
    description: 'Anti-colic baby bottles with different flow nipples',
    price: 44.99,
    category: 'newborn',
    subcategory: 'Feeding',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    inStock: true,
    rating: 4.6,
    reviews: 923
  },
  {
    id: '8',
    name: 'Newborn Diapers',
    description: 'Ultra-soft newborn diapers (size NB, 84 count)',
    price: 22.99,
    category: 'newborn',
    subcategory: 'Diapering',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    inStock: true,
    rating: 4.8,
    reviews: 2134
  },
  {
    id: '9',
    name: 'Baby Swaddle Blankets',
    description: 'Muslin swaddle blankets for better sleep (3-pack)',
    price: 29.99,
    category: 'newborn',
    subcategory: 'Sleep',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400',
    inStock: true,
    rating: 4.7,
    reviews: 678
  },
  {
    id: '10',
    name: 'Baby Monitor',
    description: 'Video baby monitor with smartphone app',
    price: 129.99,
    category: 'newborn',
    subcategory: 'Safety',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    inStock: true,
    rating: 4.5,
    reviews: 445
  },

  // Both categories
  {
    id: '11',
    name: 'Hospital Bag Essentials Kit',
    description: 'Complete kit with items for mom and baby',
    price: 79.99,
    category: 'both',
    subcategory: 'Hospital Prep',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    inStock: true,
    rating: 4.8,
    reviews: 334
  },
  {
    id: '12',
    name: 'Postpartum Care Kit',
    description: 'Recovery essentials for new moms',
    price: 54.99,
    category: 'both',
    subcategory: 'Recovery',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    inStock: true,
    rating: 4.6,
    reviews: 567
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'grid-outline' },
  { id: 'mom', name: 'Mom Essentials', icon: 'heart-outline' },
  { id: 'newborn', name: 'Newborn', icon: 'happy-outline' },
  { id: 'both', name: 'Both', icon: 'people-outline' }
];

export const subcategories = [
  'Health & Wellness',
  'Sleep & Comfort',
  'Clothing',
  'Skincare',
  'Feeding',
  'Diapering',
  'Sleep',
  'Safety',
  'Hospital Prep',
  'Recovery'
];
