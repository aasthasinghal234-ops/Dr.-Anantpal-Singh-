export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
  badge?: string;
  features: string[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  timeframe: string;
  avatarSeed: string;
  isHighPriority?: boolean;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  iconName: string;
}

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  coverColor: string;
  accentColor: string;
  description: string;
  isbn?: string;
}
