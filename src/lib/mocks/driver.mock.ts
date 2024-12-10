import { Driver } from '@/types/mocktypes';

export const mockDrivers: Driver[] = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    license_number: "N01-12-345678",
    transport_company_id: 1,
    nfc_code: "NFC123456",
    status: "in_terminal",
    citizenship: "Filipino",
    address: "789 Driver St, Puerto Princesa",
    name_of_vehicle: "Toyota HiAce",
    destination: "Narra",
    type: "operator"
  },
  {
    id: 2,
    name: "Maria Santos",
    license_number: "N02-98-765432",
    transport_company_id: 2,
    nfc_code: "NFC789012",
    status: "departed",
    citizenship: "Filipino",
    address: "321 Conductor Ave, El Nido",
    name_of_vehicle: "Hyundai Universe",
    destination: "Quezon",
    type: "operator"
  },

  {
    id: 3,
    name: "Pedro Reyes",
    license_number: "N03-56-789012",
    transport_company_id: 3,
    nfc_code: "NFC345678",
    status: "in_terminal",
    citizenship: "Filipino",
    address: "Abo-Abo, Sofronio Española",
    name_of_vehicle: "Hyundai Universe",
    destination: "Riotuba",
    type: "operator"
  },
  {
    id: 4,
    name: "Ana Lopez",
    license_number: "N04-34-567890",
    transport_company_id: 4,
    nfc_code: "NFC901234",
    status: "departed",
    citizenship: "Filipino",
    address: "123 Conductor Blvd, Cebu",
    name_of_vehicle: "Ford Transit",
    destination: "Riotuba",
    type: "operator"
  }
];

