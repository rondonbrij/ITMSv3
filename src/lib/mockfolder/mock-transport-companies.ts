// itmsv3/src/lib/mockfolder/mock-transport-companies.ts

import { TransportCompany } from '../../types/types';

// Bus companies
const busCompanies: TransportCompany[] = [
  {
    id: 1,
    name: "Cherry Bus",
    address: "Puerto Princesa Terminal",
    email: "cherrybus@example.com",
    contact_number: "+63 999 123 4567"
  },
  {
    id: 2,
    name: "Roro Bus",
    address: "Puerto Princesa Terminal",
    email: "rorobus@example.com",
    contact_number: "+63 999 234 5678"
  }
];

// Van companies
const vanCompanies: TransportCompany[] = [
  {
    id: 3,
    name: "Langgam Transport",
    address: "Puerto Princesa Terminal",
    email: "langgam@example.com",
    contact_number: "+63 999 345 6789"
  },
  {
    id: 4,
    name: "Lexus Transport",
    address: "Puerto Princesa Terminal",
    email: "lexus@example.com",
    contact_number: "+63 999 456 7890"
  },
  {
    id: 5,
    name: "Palshutex Transport",
    address: "Puerto Princesa Terminal",
    email: "palshutex@example.com",
    contact_number: "+63 999 567 8901"
  },
  {
    id: 6,
    name: "Quezon Transport",
    address: "Puerto Princesa Terminal",
    email: "quezon@example.com",
    contact_number: "+63 999 678 9012"
  },
  {
    id: 7,
    name: "Barakkah Transport",
    address: "Puerto Princesa Terminal",
    email: "barakkah@example.com",
    contact_number: "+63 999 789 0123"
  }
];

export const mockTransportCompanies: TransportCompany[] = [...busCompanies, ...vanCompanies];