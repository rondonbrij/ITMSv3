export interface TransportCompany {
  id: number;
  user?: number;
  name: string;
  address: string;
  email: string;
  contact_number: string;
}

export interface Destination {
  id: number;
  name: string;
  price: number;
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
  qr_code?: string;
  transport_company: number;
  ltt_number?: string;
  lto_number?: string;
  franchise_number?: string;
  status: 'parked' | 'maintenance' | 'operational';
  violation_count: number;
  picture?: string;
  operator: string;
  last_driver_operated?: number;
  right_side_image?: string;
  left_side_image?: string;
  back_side_image?: string;
  front_side_image?: string;
  travel_status: 'arrived' | 'departed';
}

export interface Driver {
  id: number;
  name: string;
  license_number: string;
  transport_company?: number;
  nfc_code?: string;
  status: 'in_terminal' | 'departed' | 'arrived';
  last_nfc_tap_time?: string;
  profile_picture?: string;
  citizenship: string;
  address: string;
  name_of_vehicle: string;
  destination: string;
  type: 'operator' | 'rounder';
  drop_off_pass: boolean;
  pick_up_pass: boolean;
  on_queue: boolean;
  current_trip?: number;
}

export interface Route {
  id: number;
  name: string;
  destinations: number[];
}

export interface Passageway {
  id: number;
  destination: number;
  name: string;
  price: number;
}

export interface Checkpoint {
  id: number;
  passageway: number;
  baranggay: string;
}

export interface CheckpointPrice {
  checkpointId: number;
  price: number;
}

export interface Trip {
  id: string;
  destination: number;
  vehicle?: Vehicle;
  driver?: Driver;
  departure_time: string;
  price: number;
  route: Route;
  checkpoints: {
    id: number;
    baranggay: string;
    passageway: number;
  }[];
  checkpointPrices?: CheckpointPrice[];
  transport_company: TransportCompany;
  status: 'scheduled' | 'departed' | 'arrived';
  notes?: string;
  seat_number?: string;
}

export interface Booking {
  id: number;
  trip: number;
  booking_code: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  total_passengers: number;
  total_packages: number;
}

export interface PassengerInfo {
  id: number;
  booking: number;
  first_name: string;
  last_name: string;
  email?: string;
  contact_number?: string;
  birthday?: string;
  seat_number?: string;
}

export interface PackageInfo {
  id: number;
  booking: number;
  package_type: string;
  dimensions: string;
  weight: number;
}

export interface PaymentProof {
  id: number;
  booking: number;
  payment_method: string;
  proof_image: string;
  submitted_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Notification {
  id: number;
  user: number;
  message: string;
  seen: boolean;
  created_at: string;
}

export interface VehicleViolation {
  id: number;
  driver?: number;
  vehicle?: number;
  violation_place: string;
  description?: string;
  date: string;
  status: 'unresolved' | 'resolved';
  reported_by?: string;
  transport_company?: number;
  violation_image?: string;
  ltt_number?: string;
  plate_number?: string;
}

export interface DriverViolation {
  id: number;
  driver: number;
  violation_place: string;
  description?: string;
  date: string;
  status: 'unresolved' | 'resolved';
  reported_by?: string;
  violation_image?: string;
  ltt_number?: string;
  plate_number?: string;
}

export interface Chat {
  id: number;
  sender: number;
  receiver: number;
  message: string;
  timestamp: string;
}

export interface UserProfile {
  id: number;
  user: number;
  transport_company?: number;
  backup_email?: string;
  backup_phone?: string;
}

export interface CancellationRequest {
  id: number;
  booking: number;
  reason: string;
  created_at: string;
  status: string;
}

export interface TripCancellationRequest {
  id: number;
  trip: number;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  description?: string;
  created_at: string;
  is_public: boolean;
  image?: string;
}

export interface AuditLog {
  id: number;
  user?: number;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  model_name: string;
  object_id: number;
  timestamp: string;
  details?: string;
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

export interface DTR {
  id: number;
  driver: number;
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

export interface PaymentRevenue {
  id: number;
  daily_revenue: number;
  history: any[];
  weekly_revenue: number;
  monthly_revenue: number;
  yearly_revenue: number;
  special_passes: number;
  special_passes_history: any[];
}

export interface VehicleDTR {
  id: number;
  driver: number;
  vehicle: number;
  arrival: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface Feedback {
  id: number;
  vehicle: number;
  name: string;
  cellphone: string;
  feedback: string;
  submitted_at: string;
  transport_company?: number;
}

