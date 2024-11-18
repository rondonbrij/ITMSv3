// itmsv3/src/lib/mockfolder/mock-trips.ts

import { Trip } from '../../types/types';
import { mockDestinations } from './mock-destinations';
import { mockVehicles } from './mock-vehicles';
import { mockDrivers } from './mock-drivers';
import { mockTransportCompanies } from './mock-transport-companies';

// Helper to get route by name
const getRoute = (routeName: string) => {
  return mockDestinations[0].routes.find(r => r.name === routeName);
};

export const mockTrips: Trip[] = [
  // Riotuba Route Trips
  {
    id: 1,
    route: getRoute('Bataraza-Riotuba Route')!,
    vehicle: mockVehicles.find(v => v.transport_company.name === "Cherry Bus")!,
    driver: mockDrivers[0],
    departure_time: "04:00",
    price: 750.00,
    checkpointPrices: [
      { checkpointId: 1, price: 100 },
      { checkpointId: 2, price: 260 },
      { checkpointId: 3, price: 300 },
      { checkpointId: 5, price: 472 },
      { checkpointId: 8, price: 500 }
    ],
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies.find(tc => tc.name === "Cherry Bus")!,
    status: "scheduled"
  },
  {
    id: 2,
    route: getRoute('Bataraza-Riotuba Route')!,
    vehicle: mockVehicles.find(v => v.transport_company.name === "Roro Bus")!,
    driver: mockDrivers[1],
    departure_time: "05:00",
    price: 750.00,
    checkpointPrices: [
      { checkpointId: 1, price: 100 },
      { checkpointId: 2, price: 260 },
      { checkpointId: 3, price: 300 },
      { checkpointId: 5, price: 472 },
      { checkpointId: 8, price: 500 }
    ],
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies.find(tc => tc.name === "Roro Bus")!,
    status: "scheduled"
  },

  // Rizal Route Trips (Van companies)
  {
    id: 3,
    route: getRoute('Rizal Route')!,
    vehicle: mockVehicles.find(v => v.transport_company.name === "Langgam Transport")!,
    driver: mockDrivers[2],
    departure_time: "04:30",
    price: 500.00,
    checkpointPrices: [
      { checkpointId: 1, price: 100 },
      { checkpointId: 2, price: 260 },
      { checkpointId: 3, price: 300 },
      { checkpointId: 5, price: 472 },
      { checkpointId: 7, price: 500 }
    ],
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies.find(tc => tc.name === "Langgam Transport")!,
    status: "scheduled"
  },
  {
    id: 4,
    route: getRoute('Rizal Route')!,
    vehicle: mockVehicles.find(v => v.transport_company.name === "Lexus Transport")!,
    driver: mockDrivers[3],
    departure_time: "05:30",
    price: 500.00,
    checkpointPrices: [
      { checkpointId: 1, price: 100 },
      { checkpointId: 2, price: 260 },
      { checkpointId: 3, price: 300 },
      { checkpointId: 5, price: 472 },
      { checkpointId: 7, price: 500 }
    ],
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies.find(tc => tc.name === "Lexus Transport")!,
    status: "scheduled"
  },

  // Berong Route Trips
  {
    id: 5,
    route: getRoute('Berong Route')!,
    vehicle: mockVehicles.find(v => v.transport_company.name === "Palshutex Transport")!,
    driver: mockDrivers[4],
    departure_time: "06:00",
    price: 450.00,
    checkpointPrices: [
      { checkpointId: 1, price: 100 },
      { checkpointId: 2, price: 260 },
      { checkpointId: 3, price: 300 },
      { checkpointId: 5, price: 472 },
      { checkpointId: 6, price: 450 }
    ],
    is_package: false,
    delivery_type: "Passenger",
    transport_company: mockTransportCompanies.find(tc => tc.name === "Palshutex Transport")!,
    status: "scheduled"
  },
  // Add more specific trips as needed...
];