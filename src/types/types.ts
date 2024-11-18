// User related types
export type MockResponse<T> = {
  data: T;
};

export interface Checkpoint {
  id: number;
  name: string;
  order: number;
}

export interface Route {
  id: number;
  name: string;
  checkpoints: Checkpoint[];
  direction: 'north' | 'south';
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'company_rep' | 'ltt_admin';
  permissions_level: number;
  transport_company: TransportCompany | null;
  backup_email: string | null;
  backup_phone: string | null;
}

export interface UserProfile {
  id: number;
  user: User;
  transport_company?: TransportCompany;
  role: 'admin' | 'company_rep' | 'ltt_admin';
  permissions_level: 1 | 2 | 3;
  backup_email?: string;
  backup_phone?: string;
}

// Company and Location types
export interface TransportCompany {
  id: number;
  user?: User;
  name: string;
  address: string;
  email: string;
  contact_number: string;
}

export interface Destination {
  id: number;
  name: string;
  description?: string;
  location: string;
  direction: 'north' | 'south';
  routes: Route[];
}

// Vehicle related types
export interface Vehicle {
  id: number;
  vehicle_type: string;
  model_name: string;
  year: number;
  plate_number: string;
  color: string;
  capacity: number;
  available: boolean;
  qr_code?: string;
  transport_company: TransportCompany;
  ltt_number?: string;
  lto_number?: string;
  franchise_number?: string;
  status: 'parked' | 'maintenance' | 'operational';
  violation_count: number;
  picture?: string;
}

// Driver related types
export interface Driver {
  id: number;
  name: string;
  license_number: string;
  transport_company?: TransportCompany;
  nfc_code?: string;
  status: 'in_terminal' | 'departed' | 'arrived';
  last_nfc_tap_time?: string;
  profile_picture?: string;
  applicant: string;
  citizenship: string;
  address: string;
  name_of_vehicle: string;
  destination: string;
  type_of_vehicle: string;
  seating_capacity: number;
  franchise_number: string;
  plate_number: string;
  conductor_name: string;
}

// Trip and Booking types
export interface CheckpointPrice {
  checkpointId: number;
  price: number;
}

export interface Trip {
  id: number;
  route: Route;
  vehicle: Vehicle;
  driver?: Driver;
  departure_time: string;
  price: number;
  checkpointPrices: CheckpointPrice[]; // Add checkpoint prices
  is_package: boolean;
  delivery_type: string;
  transport_company: TransportCompany;
  status: 'scheduled' | 'departed' | 'arrived';
}

export interface Booking {
  id: number;
  trip: Trip;
  passenger_name: string;
  passenger_contact: string;
  booking_code: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  total_passengers: number;
  total_packages: number;
  passenger_info: PassengerInfo[];
  package_info: PackageInfo[];
}

export interface PassengerInfo {
  id: number;
  name: string;
  age: number;
  gender: string;
}

export interface PackageInfo {
  id: number;
  package_type: string;
  dimensions: string;
  weight: number;
}

// Payment and Feedback types
export interface PaymentProof {
  id: number;
  booking?: Booking;
  payment_method: string;
  proof_image: string;
  submitted_at: string;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
}

export interface Feedback {
  id: number;
  vehicle: Vehicle;
  name: string;
  cellphone: string;
  feedback: string;
  submitted_at: string;
}

// Notification and Communication types
export interface Notification {
  id: number;
  user: User;
  message: string;
  seen: boolean;
  created_at: string;
}

export interface Chat {
  id: number;
  sender: User;
  receiver: User;
  message: string;
  timestamp: string;
}

// Violation and Maintenance types
export interface VehicleViolation {
  id: number;
  driver?: Driver;
  vehicle?: Vehicle;
  violation_type: string;
  description?: string;
  date: string;
  status: 'unresolved' | 'resolved';
  reported_by?: User;
}

export interface MaintenanceSchedule {
  id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  is_public: boolean;
  created_at: string;
}

// Administrative types
export interface Announcement {
  id: number;
  title: string;
  content: string;
  created_at: string;
  is_public: boolean;
}

export interface AuditLog {
  id: number;
  user?: User;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  model_name: string;
  object_id: number;
  timestamp: string;
  details?: string;
}

export interface DTR {
  id: number;
  driver: Driver;
  date: string;
  time_in: string;
  status: 'in_terminal' | 'departed';
}

export interface DriverApplication {
  id: number;
  applicant: string;
  citizenship: string;
  address: string;
  name_of_vehicle: string;
  destination: string;
  type_of_vehicle: string;
  seating_capacity: number;
  franchise_number: string;
  plate_number: string;
  name_of_driver: string;
  conductor_name: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Request types
export interface CancellationRequest {
  id: number;
  booking: Booking;
  reason: string;
  created_at: string;
  status: string;
}

export interface TripCancellationRequest {
  id: number;
  trip: Trip;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  created_at: string;
}