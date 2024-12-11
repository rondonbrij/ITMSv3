import { PassengerInfo } from '@/types/mocktypes';
import { mockBookings } from './booking.mock';

export const mockPassengerInfos: PassengerInfo[] = [
  {
    id: "1",
    booking: mockBookings[0],
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    contact_number: "+1234567890",
    birthday: "1990-05-15",
    seat_number: "A1"
  },
  {
    id: "2",
    booking: mockBookings[0],
    first_name: "Jane", 
    last_name: "Smith",
    email: "jane.smith@example.com", 
    contact_number: "+0987654321",
    birthday: "1988-09-22",
    seat_number: "A2"
  },
  {
    id: "3",
    booking: mockBookings[1],
    first_name: "Alice", 
    last_name: "Johnson",
    email: "alice.johnson@example.com", 
    contact_number: "+1122334455",
    birthday: "1995-03-10",
    seat_number: "B2"
  },
  // Add more mock passenger infos as needed
];