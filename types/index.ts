
export interface PregnancyData {
  currentWeek: number;
  dueDate: string;
  lastPeriod: string;
  babyName?: string;
}

export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: number; // 1-5 scale
  notes?: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  unit: 'kg' | 'lbs';
}

export interface Article {
  id: string;
  title: string;
  category: 'nutrition' | 'exercise' | 'prenatal' | 'childbirth' | 'postpartum';
  content: string;
  readTime: number;
  imageUrl?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  doctor: string;
  notes?: string;
}

export interface Milestone {
  week: number;
  title: string;
  description: string;
  completed: boolean;
}

// New types for period tracking
export interface PeriodEntry {
  id: string;
  startDate: string;
  endDate?: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes?: string;
}

export interface CycleData {
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriodDate: string;
  nextPredictedPeriod: string;
  ovulationDate?: string;
}

// New types for shopping
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'mom' | 'newborn' | 'both';
  subcategory: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
}
