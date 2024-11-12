
// User types
export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    last_login: string;
}

export interface UserProfile {
    id: number;
    user: User;
    transport_company: TransportCompany | null;
    role: string;
    permissions_level: number;
    backup_email: string | null;
    backup_phone: string | null;
}

// Transport Company types
export interface TransportCompany {
    id: number;
    name: string;
    address: string;
    email: string;
    contact_number: string;
}

// Destination types
export interface Destination {
    id: number;
    name: string;
    description: string;
    location: string;
}

// Vehicle types
export interface Vehicle {
    id: number;
    vehicle_type: string;
    model_name: string;
    year: number;
    plate_number: string;
    color: string;
    capacity: number;
    available: boolean;
    qr_code: string | null;
    transport_company: TransportCompany;
    ltt_number: string | null;
    lto_number: string | null;
    franchise_number: string | null;
    status: string;
    violation_count: number;
    picture: string | null;
}

// Driver types
export interface Driver {
    id: number;
    name: string;
    license_number: string;
    transport_company: TransportCompany | null;
    nfc_code: string | null;
    status: string;
    last_nfc_tap_time: string | null;
    profile_picture: string | null;
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
}

// Trip types
export interface Trip {
    id: number;
    destination: Destination;
    vehicle: Vehicle;
    driver: Driver | null;
    departure_time: string;
    price: number;
    is_package: boolean;
    delivery_type: string;
    transport_company: TransportCompany;
    status: string;
}

// Booking types
export interface Booking {
    id: number;
    trip: Trip;
    passenger_name: string;
    passenger_contact: string;
    booking_code: string;
    status: string;
    created_at: string;
    total_passengers: number;
    total_packages: number;
}

export interface BookingDetail extends Booking {
    passenger_info: PassengerInfo[];
    package_info: PackageInfo[];
}

export interface PassengerInfo {
    id: number;
    booking: Booking;
    name: string;
    age: number;
    gender: string;
}

export interface PackageInfo {
    id: number;
    booking: Booking;
    package_type: string;
    dimensions: string;
    weight: number;
}

// Payment Proof types
export interface PaymentProof {
    id: number;
    booking: Booking;
    payment_method: string;
    proof_image: string;
    submitted_at: string;
    status: string;
}

// Notification types
export interface Notification {
    id: number;
    user: User;
    message: string;
    seen: boolean;
    created_at: string;
}

// Violation types
export interface VehicleViolation {
    id: number;
    driver: Driver | null;
    vehicle: Vehicle | null;
    violation_type: string;
    description: string | null;
    date: string;
    status: string;
    reported_by: User | null;
}

// Chat types
export interface ChatMessage {
    id: number;
    sender: User;
    receiver: User;
    message: string;
    timestamp: string;
}

// Feedback types
export interface Feedback {
    id: number;
    vehicle: Vehicle;
    name: string;
    cellphone: string;
    feedback: string;
    submitted_at: string;
}

// Cancellation Request types
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
    status: string;
    created_at: string;
}

// Announcement types
export interface Announcement {
    id: number;
    title: string;
    content: string;
    created_at: string;
    is_public: boolean;
}

// Audit Log types
export interface AuditLog {
    id: number;
    user: User | null;
    action: string;
    model_name: string;
    object_id: number;
    timestamp: string;
    details: string | null;
}

// Maintenance Schedule types
export interface MaintenanceSchedule {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    is_public: boolean;
    created_at: string;
}

// DTR (Daily Time Record) types
export interface DTR {
    id: number;
    driver: Driver;
    date: string;
    time_in: string;
    status: string;
}

// Driver Application types
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
    status: string;
}