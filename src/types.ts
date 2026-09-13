export type ServiceCategory = 'hair' | 'nails' | 'brows-lashes' | 'cosmetology' | 'packages';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  durationMinutes: number;
  priceFrom: number;
  priceTo?: number;
  popular?: boolean;
  tag?: string;
  includedSteps?: string[];
  recommendedMasterId?: string;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  specialties: ServiceCategory[];
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  fallbackAvatar?: string;
  quote?: string;
  nextAvailableSlot?: string;
}

export interface PortfolioItem {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  masterName: string;
  image: string;
  fallbackImage?: string;
  beforeImage?: string;
  tags: string[];
  durationMinutes?: number;
  serviceId?: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  source: 'yandex' | 'site' | 'gis';
  text: string;
  service?: string;
  master?: string;
  verified?: boolean;
  avatarColor?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  additionalServices?: { id: string; name: string; price: number; duration: number }[];
  masterId: string;
  masterName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  price: number;
  durationMinutes: number;
  clientName: string;
  clientPhone: string;
  clientComment?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}
