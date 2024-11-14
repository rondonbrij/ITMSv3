
import { Feedback } from '../../types/types';
import { mockVehicles } from './mock-vehicles';

export const mockFeedback: Feedback[] = [
  {
    id: 1,
    vehicle: mockVehicles[0],
    name: "Maria Santos",
    cellphone: "+63 923 456 7890",
    feedback: "Very comfortable ride and professional driver.",
    submitted_at: "2024-01-15T10:30:00Z"
  },
  // ...add 9 more similar feedback records
];