import { Booking } from '@/types/mocktypes';
import { mockTrips } from './trip.mock';

export const mockBookings: Booking[] = [
  {
    id: "1",
    trip: mockTrips[0],
    booking_code: "ABC123XYZ",
    status: "pending",
    created_at: "2024-11-15T10:30:00Z",
    total_passengers: 2,
    total_packages: 1
  },
  {
    id: "2", 
    trip: mockTrips[1],
    booking_code: "DEF456UVW",
    status: "confirmed",
    created_at: "2024-11-16T14:45:00Z", 
    total_passengers: 1,
    total_packages: 0
  },
  // Add more mock bookings as needed
];