// itmsv3/src/lib/mockfolder/mock-destinations.ts

import { Destination, Route, Checkpoint } from '../../types/types';

// Define checkpoints
const southCheckpoints: Checkpoint[] = [
  { id: 1, name: 'Aborlan', order: 1 },
  { id: 2, name: 'Narra', order: 2 },
  { id: 3, name: 'Abo-abo', order: 3 },
  { id: 4, name: 'Sofronio Espanola', order: 4 },
  { id: 5, name: 'Brookes Point', order: 5 },
  { id: 6, name: 'Quezon', order: 4 },
  { id: 7, name: 'Berong', order: 5 },
  { id: 8, name: 'Rizal', order: 5 },
  { id: 9, name: 'Bataraza', order: 6 },
  { id: 10, name: 'Riotuba', order: 6 }
];

// Define routes
const southRoutes: Route[] = [
  {
    id: 1,
    name: 'Bataraza-Riotuba Route',
    direction: 'south',
    checkpoints: [
      southCheckpoints[0], // Aborlan
      southCheckpoints[1], // Narra
      southCheckpoints[2], // Abo-abo
      southCheckpoints[3], // Sofronio
      southCheckpoints[4], // Brookes
      southCheckpoints[8], // Bataraza
      southCheckpoints[9]  // Riotuba
    ]
  },
  {
    id: 2,
    name: 'Rizal Route',
    direction: 'south',
    checkpoints: [
      southCheckpoints[0], // Aborlan
      southCheckpoints[1], // Narra
      southCheckpoints[2], // Abo-abo
      southCheckpoints[5], // Quezon
      southCheckpoints[7]  // Rizal
    ]
  },
  {
    id: 3,
    name: 'Berong Route',
    direction: 'south',
    checkpoints: [
      southCheckpoints[0], // Aborlan
      southCheckpoints[1], // Narra
      southCheckpoints[2], // Abo-abo
      southCheckpoints[5], // Quezon
      southCheckpoints[6]  // Berong
    ]
  }
];

export const mockDestinations: Destination[] = southCheckpoints.map(checkpoint => ({
  id: checkpoint.id,
  name: checkpoint.name,
  description: `Destination: ${checkpoint.name}`,
  location: "Palawan, Philippines",
  direction: 'south',
  routes: southRoutes.filter(route => 
    route.checkpoints.some(cp => cp.name === checkpoint.name)
  )
}));