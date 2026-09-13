// src/types/tour.ts
export interface Tour {
  id: string | number;
  title: string;
  price: number;
  startDate: string;
  endDate: string;
  origin: { id: string; name: string };
  destination: { id: string; name: string };
  image?: string;
  options?: string[];
  insurance?: boolean;
  capacity?: number;
  availableSeats?: number;
}
