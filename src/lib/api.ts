import axios from 'axios';
import Cookies from 'js-cookie';
import {
  TransportCompany, Destination, Vehicle, Driver, Route, Passageway,
  Checkpoint, Trip, Booking, PassengerInfo, PackageInfo, PaymentProof,
  Notification, VehicleViolation, DriverViolation, Chat, UserProfile,
  CancellationRequest, TripCancellationRequest, Announcement, AuditLog,
  MaintenanceSchedule, DTR, DriverApplication, PaymentRevenue, VehicleDTR,
  User, Feedback
} from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      await login('itms', '123itms');
      return api(originalRequest);
    } catch (error) {
      console.error('Error refreshing authentication:', error);
    }
  }
  return Promise.reject(error);
});

// Generic CRUD functions
const createEntity = async <T>(endpoint: string, data: Partial<T>): Promise<T> => {
  const response = await api.post<T>(endpoint, data);
  return response.data;
};

const getEntity = async <T>(endpoint: string, id: number): Promise<T> => {
  const response = await api.get<T>(`${endpoint}${id}/`);
  return response.data;
};

const updateEntity = async <T>(endpoint: string, id: number, data: Partial<T>): Promise<T> => {
  const response = await api.put<T>(`${endpoint}${id}/`, data);
  return response.data;
};

const deleteEntity = async (endpoint: string, id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

const listEntities = async <T>(endpoint: string): Promise<T[]> => {
  const response = await api.get<T[]>(endpoint);
  return response.data;
};

// API functions for each entity
export const transportCompanyAPI = {
  create: (data: Partial<TransportCompany>) => createEntity<TransportCompany>('/transport-companies/', data),
  get: (id: number) => getEntity<TransportCompany>('/transport-companies/', id),
  update: (id: number, data: Partial<TransportCompany>) => updateEntity<TransportCompany>('/transport-companies/', id, data),
  delete: (id: number) => deleteEntity('/transport-companies/', id),
  list: () => listEntities<TransportCompany>('/transport-companies/'),
};

export const destinationAPI = {
  create: (data: Partial<Destination>) => createEntity<Destination>('/destinations/', data),
  get: (id: number) => getEntity<Destination>('/destinations/', id),
  update: (id: number, data: Partial<Destination>) => updateEntity<Destination>('/destinations/', id, data),
  delete: (id: number) => deleteEntity('/destinations/', id),
  list: () => listEntities<Destination>('/destinations/'),
};

export const vehicleAPI = {
  create: (data: Partial<Vehicle>) => createEntity<Vehicle>('/vehicles/', data),
  get: (id: number) => getEntity<Vehicle>('/vehicles/', id),
  update: (id: number, data: Partial<Vehicle>) => updateEntity<Vehicle>('/vehicles/', id, data),
  delete: (id: number) => deleteEntity('/vehicles/', id),
  list: () => listEntities<Vehicle>('/vehicles/'),
  getFeedback: (id: number) => api.get<Feedback[]>(`/vehicles/${id}/feedback/`),
  getViolations: (id: number) => api.get<VehicleViolation[]>(`/vehicles/${id}/violations/`),
  clearQRCode: (id: number) => api.post(`/vehicles/${id}/clear-qr-code/`),
};

export const driverAPI = {
  create: (data: Partial<Driver>) => createEntity<Driver>('/drivers/', data),
  get: (id: number) => getEntity<Driver>('/drivers/', id),
  update: (id: number, data: Partial<Driver>) => updateEntity<Driver>('/drivers/', id, data),
  delete: (id: number) => deleteEntity('/drivers/', id),
  list: () => listEntities<Driver>('/drivers/'),
  getTripHistory: (id: number) => api.get<Trip[]>(`/drivers/${id}/trip-history/`),
};

export const routeAPI = {
  create: (data: Partial<Route>) => createEntity<Route>('/routes/', data),
  get: (id: number) => getEntity<Route>('/routes/', id),
  update: (id: number, data: Partial<Route>) => updateEntity<Route>('/routes/', id, data),
  delete: (id: number) => deleteEntity('/routes/', id),
  list: () => listEntities<Route>('/routes/'),
};

export const passagewayAPI = {
  create: (data: Partial<Passageway>) => createEntity<Passageway>('/passageways/', data),
  get: (id: number) => getEntity<Passageway>('/passageways/', id),
  update: (id: number, data: Partial<Passageway>) => updateEntity<Passageway>('/passageways/', id, data),
  delete: (id: number) => deleteEntity('/passageways/', id),
  list: () => listEntities<Passageway>('/passageways/'),
};

export const checkpointAPI = {
  create: (data: Partial<Checkpoint>) => createEntity<Checkpoint>('/checkpoints/', data),
  get: (id: number) => getEntity<Checkpoint>('/checkpoints/', id),
  update: (id: number, data: Partial<Checkpoint>) => updateEntity<Checkpoint>('/checkpoints/', id, data),
  delete: (id: number) => deleteEntity('/checkpoints/', id),
  list: () => listEntities<Checkpoint>('/checkpoints/'),
};

export const tripAPI = {
  create: (data: Partial<Trip>) => createEntity<Trip>('/trips/', data),
  get: (id: number) => getEntity<Trip>('/trips/', id),
  update: (id: number, data: Partial<Trip>) => updateEntity<Trip>('/trips/', id, data),
  delete: (id: number) => deleteEntity('/trips/', id),
  list: () => listEntities<Trip>('/trips/'),
  updateStatus: (id: number, status: string) => api.patch(`/update-trip-status/${id}/`, { status }),
  getBookingDetails: (id: number) => api.get<Booking[]>(`/trip-booking-details/${id}/`),
  getTransportCompanies: () => listEntities<TransportCompany>('/transport-companies/'),
};

export const bookingAPI = {
  create: (data: Partial<Booking>) => createEntity<Booking>('/bookings/', data),
  get: (id: number) => getEntity<Booking>('/bookings/', id),
  update: (id: number, data: Partial<Booking>) => updateEntity<Booking>('/bookings/', id, data),
  delete: (id: number) => deleteEntity('/bookings/', id),
  list: () => listEntities<Booking>('/bookings/'),
};

export const passengerInfoAPI = {
  create: (data: Partial<PassengerInfo>) => createEntity<PassengerInfo>('/passenger-info/', data),
  get: (id: number) => getEntity<PassengerInfo>('/passenger-info/', id),
  update: (id: number, data: Partial<PassengerInfo>) => updateEntity<PassengerInfo>('/passenger-info/', id, data),
  delete: (id: number) => deleteEntity('/passenger-info/', id),
  list: () => listEntities<PassengerInfo>('/passenger-info/'),
};

export const packageInfoAPI = {
  create: (data: Partial<PackageInfo>) => createEntity<PackageInfo>('/package-info/', data),
  get: (id: number) => getEntity<PackageInfo>('/package-info/', id),
  update: (id: number, data: Partial<PackageInfo>) => updateEntity<PackageInfo>('/package-info/', id, data),
  delete: (id: number) => deleteEntity('/package-info/', id),
  list: () => listEntities<PackageInfo>('/package-info/'),
};

export const paymentProofAPI = {
  create: (data: Partial<PaymentProof>) => createEntity<PaymentProof>('/payment-proofs/', data),
  get: (id: number) => getEntity<PaymentProof>('/payment-proofs/', id),
  update: (id: number, data: Partial<PaymentProof>) => updateEntity<PaymentProof>('/payment-proofs/', id, data),
  delete: (id: number) => deleteEntity('/payment-proofs/', id),
  list: () => listEntities<PaymentProof>('/payment-proofs/'),
};

export const notificationAPI = {
  create: (data: Partial<Notification>) => createEntity<Notification>('/notifications/', data),
  get: (id: number) => getEntity<Notification>('/notifications/', id),
  update: (id: number, data: Partial<Notification>) => updateEntity<Notification>('/notifications/', id, data),
  delete: (id: number) => deleteEntity('/notifications/', id),
  list: () => listEntities<Notification>('/notifications/'),
  markAsSeen: () => api.post('/notifications/mark-seen/'),
};

export const vehicleViolationAPI = {
  create: (data: Partial<VehicleViolation>) => createEntity<VehicleViolation>('/vehicle-violations/', data),
  get: (id: number) => getEntity<VehicleViolation>('/vehicle-violations/', id),
  update: (id: number, data: Partial<VehicleViolation>) => updateEntity<VehicleViolation>('/vehicle-violations/', id, data),
  delete: (id: number) => deleteEntity('/vehicle-violations/', id),
  list: () => listEntities<VehicleViolation>('/vehicle-violations/'),
};

export const driverViolationAPI = {
  create: (data: Partial<DriverViolation>) => createEntity<DriverViolation>('/driver-violations/', data),
  get: (id: number) => getEntity<DriverViolation>('/driver-violations/', id),
  update: (id: number, data: Partial<DriverViolation>) => updateEntity<DriverViolation>('/driver-violations/', id, data),
  delete: (id: number) => deleteEntity('/driver-violations/', id),
  list: () => listEntities<DriverViolation>('/driver-violations/'),
};

export const chatAPI = {
  create: (data: Partial<Chat>) => createEntity<Chat>('/chats/', data),
  get: (id: number) => getEntity<Chat>('/chats/', id),
  update: (id: number, data: Partial<Chat>) => updateEntity<Chat>('/chats/', id, data),
  delete: (id: number) => deleteEntity('/chats/', id),
  list: () => listEntities<Chat>('/chats/'),
};

export const userProfileAPI = {
  create: (data: Partial<UserProfile>) => createEntity<UserProfile>('/user-profiles/', data),
  get: (id: number) => getEntity<UserProfile>('/user-profiles/', id),
  update: (id: number, data: Partial<UserProfile>) => updateEntity<UserProfile>('/user-profiles/', id, data),
  delete: (id: number) => deleteEntity('/user-profiles/', id),
  list: () => listEntities<UserProfile>('/user-profiles/'),
};

export const cancellationRequestAPI = {
  create: (data: Partial<CancellationRequest>) => createEntity<CancellationRequest>('/cancellation-requests/', data),
  get: (id: number) => getEntity<CancellationRequest>('/cancellation-requests/', id),
  update: (id: number, data: Partial<CancellationRequest>) => updateEntity<CancellationRequest>('/cancellation-requests/', id, data),
  delete: (id: number) => deleteEntity('/cancellation-requests/', id),
  list: () => listEntities<CancellationRequest>('/cancellation-requests/'),
};

export const tripCancellationRequestAPI = {
  create: (data: Partial<TripCancellationRequest>) => createEntity<TripCancellationRequest>('/trip-cancellation-requests/', data),
  get: (id: number) => getEntity<TripCancellationRequest>('/trip-cancellation-requests/', id),
  update: (id: number, data: Partial<TripCancellationRequest>) => updateEntity<TripCancellationRequest>('/trip-cancellation-requests/', id, data),
  delete: (id: number) => deleteEntity('/trip-cancellation-requests/', id),
  list: () => listEntities<TripCancellationRequest>('/trip-cancellation-requests/'),
  approve: (id: number) => api.patch(`/trip-cancellation-requests/${id}/approve-cancellation/`),
};

export const announcementAPI = {
  create: (data: Partial<Announcement>) => createEntity<Announcement>('/announcements/', data),
  get: (id: number) => getEntity<Announcement>('/announcements/', id),
  update: (id: number, data: Partial<Announcement>) => updateEntity<Announcement>('/announcements/', id, data),
  delete: (id: number) => deleteEntity('/announcements/', id),
  list: () => listEntities<Announcement>('/announcements/'),
};

export const auditLogAPI = {
  create: (data: Partial<AuditLog>) => createEntity<AuditLog>('/audit-logs/', data),
  get: (id: number) => getEntity<AuditLog>('/audit-logs/', id),
  update: (id: number, data: Partial<AuditLog>) => updateEntity<AuditLog>('/audit-logs/', id, data),
  delete: (id: number) => deleteEntity('/audit-logs/', id),
  list: () => listEntities<AuditLog>('/audit-logs/'),
};

export const maintenanceScheduleAPI = {
  create: (data: Partial<MaintenanceSchedule>) => createEntity<MaintenanceSchedule>('/maintenance-schedules/', data),
  get: (id: number) => getEntity<MaintenanceSchedule>('/maintenance-schedules/', id),
  update: (id: number, data: Partial<MaintenanceSchedule>) => updateEntity<MaintenanceSchedule>('/maintenance-schedules/', id, data),
  delete: (id: number) => deleteEntity('/maintenance-schedules/', id),
  list: () => listEntities<MaintenanceSchedule>('/maintenance-schedules/'),
};

export const dtrAPI = {
  create: (data: Partial<DTR>) => createEntity<DTR>('/dtr-entries/', data),
  get: (id: number) => getEntity<DTR>('/dtr-entries/', id),
  update: (id: number, data: Partial<DTR>) => updateEntity<DTR>('/dtr-entries/', id, data),
  delete: (id: number) => deleteEntity('/dtr-entries/', id),
  list: () => listEntities<DTR>('/dtr-entries/'),
};

export const driverApplicationAPI = {
  create: (data: Partial<DriverApplication>) => createEntity<DriverApplication>('/driver-applications/', data),
  get: (id: number) => getEntity<DriverApplication>('/driver-applications/', id),
  update: (id: number, data: Partial<DriverApplication>) => updateEntity<DriverApplication>('/driver-applications/', id, data),
  delete: (id: number) => deleteEntity('/driver-applications/', id),
  list: () => listEntities<DriverApplication>('/driver-applications/'),
  approve: (id: number) => api.post(`/driver-applications/${id}/approve/`),
};

export const paymentRevenueAPI = {
  create: (data: Partial<PaymentRevenue>) => createEntity<PaymentRevenue>('/payment-revenue/', data),
  get: (id: number) => getEntity<PaymentRevenue>('/payment-revenue/', id),
  update: (id: number, data: Partial<PaymentRevenue>) => updateEntity<PaymentRevenue>('/payment-revenue/', id, data),
  delete: (id: number) => deleteEntity('/payment-revenue/', id),
  list: () => listEntities<PaymentRevenue>('/payment-revenue/'),
};

export const vehicleDTRAPI = {
  create: (data: Partial<VehicleDTR>) => createEntity<VehicleDTR>('/vehicle-dtr/', data),
  get: (id: number) => getEntity<VehicleDTR>('/vehicle-dtr/', id),
  update: (id: number, data: Partial<VehicleDTR>) => updateEntity<VehicleDTR>('/vehicle-dtr/', id, data),
  delete: (id: number) => deleteEntity('/vehicle-dtr/', id),
  list: () => listEntities<VehicleDTR>('/vehicle-dtr/'),
};

export const userAPI = {
  create: (data: Partial<User>) => createEntity<User>('/users/', data),
  get: (id: number) => getEntity<User>('/users/', id),
  update: (id: number, data: Partial<User>) => updateEntity<User>('/users/', id, data),
  delete: (id: number) => deleteEntity('/users/', id),
  list: () => listEntities<User>('/users/'),
};

export const feedbackAPI = {
  create: (data: Partial<Feedback>) => createEntity<Feedback>('/feedback/', data),
  get: (id: number) => getEntity<Feedback>('/feedback/', id),
  update: (id: number, data: Partial<Feedback>) => updateEntity<Feedback>('/feedback/', id, data),
  delete: (id: number) => deleteEntity('/feedback/', id),
  list: () => listEntities<Feedback>('/feedback/'),
};

// Authentication and other utility functions
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login/', { username, password });
    const { token } = response.data;
    Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout/');
    Cookies.remove('authToken');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/check-auth/');
    return response.data;
  } catch (error) {
    console.error('Check auth error:', error);
    throw error;
  }
};

export const getCSRFToken = async () => {
  try {
    const response = await api.get('/csrf/');
    return response.data.csrfToken;
  } catch (error) {
    console.error('Get CSRF token error:', error);
    throw error;
  }
};

export const getDashboardStatistics = async () => {
  const response = await api.get('/dashboard-statistics/');
  return response.data;
};

export const getRecentBookings = async () => {
  const response = await api.get('/bookings/recent/');
  return response.data;
};

export const submitViolation = async (data: Partial<VehicleViolation>) => {
  const response = await api.post('/submit-violation/', data);
  return response.data;
};

export const processTerminalFee = async (data: { nfc_id: string; amount: number; vehicle_type: string }) => {
  const response = await api.post('/process_terminal_fee/', data);
  return response.data;
};

export const processSpecialPass = async (data: { nfc_code: string; drop_off_pass: boolean; pick_up_pass: boolean; vehicle_type: string }) => {
  const response = await api.post('/process_special_pass/', data);
  return response.data;
};

export const processDeparture = async (data: { nfc_id: string }) => {
  const response = await api.post('/process_departure/', data);
  return response.data;
};

export const searchDrivers = async (name: string) => {
  const response = await api.get(`/drivers/search/?name=${name}`);
  return response.data;
};

export const createVehicleDTR = async (data: Partial<VehicleDTR>) => {
  const response = await api.post('/vehicle-dtr/', data);
  return response.data;
};

export const checkSpecialPassByVehicle = async (vehicleId: number) => {
  const response = await api.get(`/check_special_pass_by_vehicle/${vehicleId}/`);
  return response.data;
};

export const getDriverInfo = async (nfcCode: string) => {
  const response = await api.get(`/driver-info/${nfcCode}/`);
  return response.data;
};

export const getVehicleByLTT = async (lttNumber: string) => {
  const response = await api.get(`/vehicles/ltt/${lttNumber}/`);
  return response.data;
};

export const submitMaintenance = async (data: { vehicle_id: number; checklist_items: { checked: boolean }[] }) => {
  const response = await api.post('/submit-maintenance/', data);
  return response.data;
};

export const createDTREntry = async (data: { nfc_code: string; arrival?: string; status?: string }) => {
  const response = await api.post('/create-dtr-entry', data);
  return response.data;
};

export const updateDriverQueue = async (data: { nfc_code: string; vehicle_id?: number; on_queue: boolean }) => {
  const response = await api.post('/update-driver-queue/', data);
  return response.data;
};

export default api;

