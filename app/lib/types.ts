export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "mechanic" | "admin";
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  startingPrice: number;
  priceUnit: string;
  features: string[];
}

export interface Mechanic {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  services: string[];
  avatar: string;
  verified: boolean;
  responseTime: string;
  priceRange: string;
}

export interface Review {
  id: number;
  user: string;
  location: string;
  initials: string;
  rating: number;
  mechanic: string;
  service: string;
  review: string;
  date: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  location: string;
  service: string;
  vehicle: string;
  notes: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  mechanicId?: number;
  mechanicName?: string;
  createdAt: string;
  updatedAt: string;
}