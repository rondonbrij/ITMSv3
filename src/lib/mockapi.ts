import { mockTransportCompanies } from './mocks/transportCompany.mock';
import { mockVehicles } from './mocks/vehicle.mock';
import { mockDrivers } from './mocks/driver.mock';
import { mockTrips } from './mocks/trip.mock';
import { mockCheckpoints } from './mocks/checkpoint.mock';
import { mockPassageways } from './mocks/passageway.mock';
import { mockDestinations } from './mocks/destination.mock';
import { mockRoutes } from './mocks/route.mock';
import { TransportCompany, Vehicle, Driver, Trip, Checkpoint, Passageway, Destination, Route } from '@/types/mocktypes';

export const mockAPI = {
  transportCompany: {
    list: async (): Promise<TransportCompany[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTransportCompanies), 500);
      });
    },
    get: async (id: number): Promise<TransportCompany | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTransportCompanies.find((company: TransportCompany) => company.id === id)), 500);
      });
    }
  },
  vehicle: {
    list: async (): Promise<Vehicle[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVehicles), 500);
      });
    },
    get: async (id: number): Promise<Vehicle | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVehicles.find((vehicle: Vehicle) => vehicle.id === id)), 500);
      });
    }
  },
  driver: {
    list: async (): Promise<Driver[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDrivers), 500);
      });
    },
    get: async (id: number): Promise<Driver | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDrivers.find((driver: Driver) => driver.id === id)), 500);
      });
    }
  },
  trip: {
    list: async (): Promise<Trip[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTrips), 500);
      });
    },
    get: async (id: string): Promise<Trip | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTrips.find((trip: Trip) => trip.id === id)), 500);
      });
    }
  },
  checkpoint: {
    list: async (): Promise<Checkpoint[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockCheckpoints), 500);
      });
    },
    get: async (id: number): Promise<Checkpoint | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockCheckpoints.find((checkpoint: Checkpoint) => checkpoint.id === id)), 500);
      });
    }
  },
  passageway: {
    list: async (): Promise<Passageway[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockPassageways), 500);
      });
    },
    get: async (id: number): Promise<Passageway | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockPassageways.find((passageway: Passageway) => passageway.id === id)), 500);
      });
    }
  },
  destination: {
    list: async (): Promise<Destination[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDestinations), 500);
      });
    },
    get: async (id: number): Promise<Destination | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDestinations.find((destination: Destination) => destination.id === id)), 500);
      });
    }
  },
  route: {
    list: async (): Promise<Route[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockRoutes), 500);
      });
    },
    get: async (id: number): Promise<Route | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockRoutes.find((route: Route) => route.id === id)), 500);
      });
    }
  }
};

