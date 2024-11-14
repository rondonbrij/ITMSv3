import { VehicleViolation } from '../../types/types';
import { mockVehicles } from './mock-vehicles';
import { mockDrivers } from './mock-drivers';
import { mockUsers } from './mock-users';

export const mockViolations: VehicleViolation[] = [
  {
    id: 1,
    driver: mockDrivers[0],
    vehicle: mockVehicles[0],
    violation_type: "Speeding",
    description: "Exceeded speed limit by 20km/h",
    date: "2024-01-15",
    status: "unresolved",
    reported_by: mockUsers[0]  // Use actual User object instead of string
  },
  // ...add 9 more similar violation records
];