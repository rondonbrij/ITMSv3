export interface TransportCompany {
  id: number;
  name: string;
  address: string;
  email: string;
  contact_number: string;
}

export interface Vehicle {
  id: number;
  vehicle_type: string;
  model_name: string;
  year: number;
  plate_number: string;
  color: string;
  capacity: number;
  available: boolean;
  transport_company_id: number;
  ltt_number: string;
  franchise_number: string;
  status: string;
  violation_count: number;
  travel_status: string;
}

export interface Driver {
  id: number;
  name: string;
  license_number: string;
  transport_company_id: number;
  nfc_code: string;
  status: string;
  citizenship: string;
  address: string;
  name_of_vehicle: string;
  destination: string;
  type: string;
}

export interface Checkpoint {
  id: number;
  baranggay: string;
}

export interface Passageway {
  id: number;
  name: string;
  price: number;
  checkpoints: Checkpoint[];  
}

export interface Destination {
  id: number;
  name: string;
  passageways: Passageway[];  
}

export interface Route {
  id: number;
  name: string;
  destinations: Destination[];  
}

export interface Trip {
  id: string;
  vehicle_id: number;
  driver_id: number;
  departure_time: string;
  route: Route;
  transport_company: TransportCompany;
  status: string;
  notes: string;
  effective_vehicle_type: string;
  effective_capacity: number;
}

export interface Booking {
  id: string;
  trip: Trip;
  booking_code: string;
  status: string;
  created_at: string;
  total_passengers: number;
  total_packages: number;
}

export interface PassengerInfo {
  id: string;
  booking: Booking;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  birthday: string;
  seat_number: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  images: string[];
  slug: string;
}

export interface PaginatedAnnouncements {
  data: Announcement[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}