import { Booking } from '../../types/types';
import { mockTrips } from './mock-trips';

let passengerInfoId = 1;
let packageInfoId = 1;

export const mockBookings: Booking[] = [
  {
    id: 1,
    trip: mockTrips[0],
    passenger_name: "John Smith",
    passenger_contact: "+63 912 345 6789",
    booking_code: "BOOK123ABC",
    status: "confirmed",
    created_at: "2024-01-15T08:30:00Z",
    total_passengers: 2,
    total_packages: 1,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "John Smith",
        age: 35,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Jane Smith",
        age: 32,
        gender: "Female"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Luggage",
        dimensions: "60x40x20",
        weight: 15.5
      }
    ]
  },
  {
    id: 2,
    trip: mockTrips[1],
    passenger_name: "Maria Garcia",
    passenger_contact: "+63 923 456 7890",
    booking_code: "BOOK456DEF",
    status: "pending",
    created_at: "2024-01-15T09:15:00Z",
    total_passengers: 1,
    total_packages: 2,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Maria Garcia",
        age: 28,
        gender: "Female"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Box",
        dimensions: "30x30x30",
        weight: 8.0
      },
      {
        id: packageInfoId++,
        package_type: "Bag",
        dimensions: "50x30x20",
        weight: 5.5
      }
    ]
  },
  {
    id: 3,
    trip: mockTrips[2],
    passenger_name: "Robert Chen",
    passenger_contact: "+63 934 567 8901",
    booking_code: "BOOK789GHI",
    status: "confirmed",
    created_at: "2024-01-15T10:00:00Z",
    total_passengers: 3,
    total_packages: 0,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Robert Chen",
        age: 45,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Linda Chen",
        age: 42,
        gender: "Female"
      },
      {
        id: passengerInfoId++,
        name: "Tommy Chen",
        age: 12,
        gender: "Male"
      }
    ],
    package_info: []
  },
  {
    id: 4,
    trip: mockTrips[3],
    passenger_name: "Sarah Johnson",
    passenger_contact: "+63 945 678 9012",
    booking_code: "BOOK012JKL",
    status: "cancelled",
    created_at: "2024-01-15T11:30:00Z",
    total_passengers: 1,
    total_packages: 1,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Sarah Johnson",
        age: 29,
        gender: "Female"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Gift Box",
        dimensions: "20x20x20",
        weight: 2.5
      }
    ]
  },
  {
    id: 5,
    trip: mockTrips[4],
    passenger_name: "Michael Santos",
    passenger_contact: "+63 956 789 0123",
    booking_code: "BOOK345MNO",
    status: "confirmed",
    created_at: "2024-01-15T12:45:00Z",
    total_passengers: 4,
    total_packages: 2,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Michael Santos",
        age: 38,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Anna Santos",
        age: 36,
        gender: "Female"
      },
      {
        id: passengerInfoId++,
        name: "Mark Santos",
        age: 10,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Lisa Santos",
        age: 8,
        gender: "Female"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Suitcase",
        dimensions: "70x50x25",
        weight: 20.0
      },
      {
        id: packageInfoId++,
        package_type: "Backpack",
        dimensions: "40x30x20",
        weight: 7.5
      }
    ]
  },
  {
    id: 6,
    trip: mockTrips[5],
    passenger_name: "David Wilson",
    passenger_contact: "+63 967 890 1234",
    booking_code: "BOOK678PQR",
    status: "pending",
    created_at: "2024-01-15T13:15:00Z",
    total_passengers: 2,
    total_packages: 3,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "David Wilson",
        age: 52,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Helen Wilson",
        age: 48,
        gender: "Female"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Box",
        dimensions: "40x40x40",
        weight: 12.0
      },
      {
        id: packageInfoId++,
        package_type: "Box",
        dimensions: "35x35x35",
        weight: 10.0
      },
      {
        id: packageInfoId++,
        package_type: "Bag",
        dimensions: "45x30x25",
        weight: 8.0
      }
    ]
  },
  {
    id: 7,
    trip: mockTrips[6],
    passenger_name: "Emma Thompson",
    passenger_contact: "+63 978 901 2345",
    booking_code: "BOOK901STU",
    status: "confirmed",
    created_at: "2024-01-15T14:30:00Z",
    total_passengers: 1,
    total_packages: 0,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Emma Thompson",
        age: 25,
        gender: "Female"
      }
    ],
    package_info: []
  },
  {
    id: 8,
    trip: mockTrips[7],
    passenger_name: "Peter Rodriguez",
    passenger_contact: "+63 989 012 3456",
    booking_code: "BOOK234VWX",
    status: "confirmed",
    created_at: "2024-01-15T15:45:00Z",
    total_passengers: 2,
    total_packages: 1,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Peter Rodriguez",
        age: 31,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Mary Rodriguez",
        age: 30,
        gender: "Female"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Guitar Case",
        dimensions: "120x40x15",
        weight: 5.0
      }
    ]
  },
  {
    id: 9,
    trip: mockTrips[8],
    passenger_name: "Sofia Lee",
    passenger_contact: "+63 990 123 4567",
    booking_code: "BOOK567YZA",
    status: "pending",
    created_at: "2024-01-15T16:00:00Z",
    total_passengers: 3,
    total_packages: 2,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Sofia Lee",
        age: 40,
        gender: "Female"
      },
      {
        id: passengerInfoId++,
        name: "James Lee",
        age: 42,
        gender: "Male"
      },
      {
        id: passengerInfoId++,
        name: "Alex Lee",
        age: 15,
        gender: "Male"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Suitcase",
        dimensions: "65x45x25",
        weight: 18.5
      },
      {
        id: packageInfoId++,
        package_type: "Box",
        dimensions: "30x30x30",
        weight: 7.0
      }
    ]
  },
  {
    id: 10,
    trip: mockTrips[9],
    passenger_name: "Thomas Brown",
    passenger_contact: "+63 901 234 5678",
    booking_code: "BOOK890BCD",
    status: "confirmed",
    created_at: "2024-01-15T17:15:00Z",
    total_passengers: 1,
    total_packages: 1,
    passenger_info: [
      {
        id: passengerInfoId++,
        name: "Thomas Brown",
        age: 27,
        gender: "Male"
      }
    ],
    package_info: [
      {
        id: packageInfoId++,
        package_type: "Laptop Bag",
        dimensions: "45x35x10",
        weight: 3.5
      }
    ]
  }
];