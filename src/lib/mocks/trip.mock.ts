import { Trip } from '@/types/mocktypes';
import { mockRoutes } from '../mocks/route.mock';
import { mockTransportCompanies } from '../mocks/transportCompany.mock';

export const mockTrips: Trip[] = [
  {
    id: "1",
    vehicle_id: 1,
    driver_id: 1,
    departure_time: "2024-12-17T08:00:00Z",
    route: mockRoutes[0],
    transport_company: mockTransportCompanies[0], 
    status: "scheduled",
    notes: "No pets allowed",
    effective_vehicle_type: "VAN",
    effective_capacity: 15,
  },
  {
    id: "2",
    vehicle_id: 2,
    driver_id: 2,
    departure_time: "2024-12-16T07:30:00Z",
    route: mockRoutes[1],
    transport_company: mockTransportCompanies[1],
    status: "scheduled",
    notes: "No refunds for cancellations",
    effective_vehicle_type: "BUS",
    effective_capacity: 66,
  },
  {
    id: "3",
    vehicle_id: 3,
    driver_id: 3,
    departure_time: "2024-12-17T08:30:00Z",

    route: mockRoutes[1], 
    transport_company: mockTransportCompanies[2],
    status: "scheduled",
    notes: "Pets allowed",
    effective_vehicle_type: "BUS",
    effective_capacity: 66,
  },
  {
    id: "4",
    vehicle_id: 4,
    driver_id: 4,
    departure_time: "2024-12-16T07:00:00Z",

    route: mockRoutes[0], 
    transport_company: mockTransportCompanies[3],
    status: "scheduled",
    notes: "None",
    effective_vehicle_type: "VAN",
    effective_capacity: 15,
  }
  
];
