import { Route } from '@/types/mocktypes';
import { mockDestinations } from './destination.mock';

export const mockRoutes: Route[] = [
  { id: 1, name: "Narra", destinations: [mockDestinations[0], mockDestinations[1]] },
  { id: 2, name: "Abo-Abo", destinations: [mockDestinations[0], mockDestinations[1], mockDestinations[2]] },
];

