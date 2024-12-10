import { Vehicle } from '@/types/mocktypes';

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    vehicle_type: "VAN",
    model_name: "Toyota HiAce",
    year: 2021,
    plate_number: "XYZ 789",
    color: "White",
    capacity: 15,
    available: true,
    transport_company_id: 1,
    ltt_number: "LTT67890",
    franchise_number: "FR54321",
    status: "operational",
    violation_count: 0,
    travel_status: "Scheduled"
  },
 
  {
    id: 2,
    vehicle_type: "BUS",
    model_name: "Hyundai Universe",
    year: 2022,
    plate_number: "ABC 123",
    color: "Green",
    capacity: 66,
    available: true,
    transport_company_id: 2,
    ltt_number: "LTT12345",
    franchise_number: "FR98765",
    status: "operational",
    violation_count: 0,
    travel_status: "Scheduled"
  },

  {
    id: 3,
    vehicle_type: "BUS",
    model_name: "Hyundai Universe",
    year: 2022,
    plate_number: "DEF 456",
    color: "White",
    capacity: 66,
    available: true,
    transport_company_id: 3,
    ltt_number: "LTT23456",
    franchise_number: "FR87654",
    status: "operational",
    violation_count: 0,
    travel_status: "Scheduled"
  },
  {
    id: 4,
    vehicle_type: "VAN",
    model_name: "Ford Transit",
    year: 2020,
    plate_number: "GHI 789",
    color: "White",
    capacity: 15,
    available: true,
    transport_company_id: 4,
    ltt_number: "LTT34567",
    franchise_number: "FR76543",
    status: "operational",
    violation_count: 0,
    travel_status: "Scheduled"
  }
];
