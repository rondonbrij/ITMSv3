// itmsv3/src/lib/mockfolder/mock-trips.ts

import { Trip } from '../../types/types';
import { mockDestinations } from './mock-destinations';
import { mockVehicles } from './mock-vehicles';
import { mockDrivers } from './mock-drivers';
import { mockTransportCompanies } from './mock-transport-companies';

export const mockTrips: Trip[] = [
  {
    id: 1,
    destination: mockDestinations[0],
    vehicle: mockVehicles[0],
    driver: mockDrivers[0],
    departure_time: "2024-11-15T08:00:00Z",
    price: 500.00,
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies[0],
    status: "scheduled"
  },
  {
    id: 2,
    destination: mockDestinations[1],
    vehicle: mockVehicles[1],
    driver: mockDrivers[1],
    departure_time: "2024-11-15T09:30:00Z",
    price: 450.00,
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies[0],
    status: "scheduled"
  },
  // ... Add 8 more mock trips following similar pattern
];