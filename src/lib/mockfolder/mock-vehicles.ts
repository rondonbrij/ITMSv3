// itmsv3/src/lib/mockfolder/mock-vehicles.ts

import { Vehicle } from '../../types/types';
import { mockTransportCompanies } from './mock-transport-companies';

// Helper to find company by name
const findCompany = (name: string) => mockTransportCompanies.find(c => c.name === name);

export const mockVehicles: Vehicle[] = [
  // Bus company vehicles
  {
    id: 1,
    vehicle_type: "BUS",  // Changed to match the filter value
    model_name: "Hyundai Universe",
    year: 2023,
    plate_number: "ABC 1234",
    color: "White",
    capacity: 45,
    available: true,
    transport_company: findCompany("Cherry Bus")!,
    status: "operational",
    violation_count: 0,
    operator: "Cherry Bus Operator"
  },
  {
    id: 2,
    vehicle_type: "BUS",  // Changed to match the filter value
    model_name: "Scania K410",
    year: 2023,
    plate_number: "DEF 5678",
    color: "Blue",
    capacity: 45,
    available: true,
    transport_company: findCompany("Roro Bus")!,
    status: "operational",
    violation_count: 0,
    operator: "Roro Bus Operator"
  },

  // Van company vehicles
  {
    id: 3,
    vehicle_type: "VAN",  // Changed to match the filter value
    model_name: "Toyota HiAce",
    year: 2023,
    plate_number: "GHI 9012",
    color: "White",
    capacity: 15,
    available: true,
    transport_company: findCompany("Langgam Transport")!,
    status: "operational",
    violation_count: 0,
    operator: "Langgam Transport Operator"
  },
  // Add more vehicles for each company...
];