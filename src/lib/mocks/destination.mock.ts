import { Destination } from '@/types/mocktypes';
import { mockPassageways } from './passageway.mock';

export const mockDestinations: Destination[] = [
  { id: 1, name: "Aborlan",  passageways: [mockPassageways[0], mockPassageways[1], mockPassageways[2], mockPassageways[3], mockPassageways[4]] },
  { id: 2, name: "Narra",  passageways: [mockPassageways[5], mockPassageways[6]] },
  { id: 3, name: "Abo-Abo",  passageways: [mockPassageways[7], mockPassageways[8], mockPassageways[9]] },
];

