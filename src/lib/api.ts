import axios from 'axios';
import Cookies from 'js-cookie';
import {
  TransportCompany, Destination, Vehicle, Route, Passageway,
  Checkpoint, Trip, Booking, PassengerInfo, PaymentProof,
  VehicleViolation, UserProfile,
  CancellationRequest, Announcement, Feedback
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
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Token ${token}`;
  }
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers = config.headers || {};
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


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
  list: () => listEntities<Trip>('/trips/?include=transport_company'),
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
  getBookingsByTripId: async (tripId: number) => {
    const response = await api.get<Booking[]>(
      `/bookings/?trip_id=${tripId}`
    );
    return response.data;
  },
};

export const passengerInfoAPI = {
  create: (data: Partial<PassengerInfo>) => createEntity<PassengerInfo>('/passenger-info/', data),
  get: (id: number) => getEntity<PassengerInfo>('/passenger-info/', id),
  update: (id: number, data: Partial<PassengerInfo>) => updateEntity<PassengerInfo>('/passenger-info/', id, data),
  delete: (id: number) => deleteEntity('/passenger-info/', id),
  list: () => listEntities<PassengerInfo>('/passenger-info/'),
};

export const paymentProofAPI = {
  create: (data: Partial<PaymentProof>) => createEntity<PaymentProof>('/payment-proofs/', data),
  get: (id: number) => getEntity<PaymentProof>('/payment-proofs/', id),
  update: (id: number, data: Partial<PaymentProof>) => updateEntity<PaymentProof>('/payment-proofs/', id, data),
  delete: (id: number) => deleteEntity('/payment-proofs/', id),
  list: () => listEntities<PaymentProof>('/payment-proofs/'),
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


export const announcementAPI = {
  create: (data: Partial<Announcement>) => createEntity<Announcement>('/announcements/', data),
  get: (id: number) => getEntity<Announcement>('/announcements/', id),
  update: (id: number, data: Partial<Announcement>) => updateEntity<Announcement>('/announcements/', id, data),
  delete: (id: number) => deleteEntity('/announcements/', id),
  list: () => listEntities<Announcement>('/announcements/'),
};

export const feedbackAPI = {
  create: (data: Partial<Feedback>) => createEntity<Feedback>('/feedback/', data),
  get: (id: number) => getEntity<Feedback>('/feedback/', id),
  update: (id: number, data: Partial<Feedback>) => updateEntity<Feedback>('/feedback/', id, data),
  delete: (id: number) => deleteEntity('/feedback/', id),
  list: () => listEntities<Feedback>('/feedback/'),
};


export const getRecentBookings = async () => {
  const response = await api.get('/bookings/recent/');
  return response.data;
};

export async function getTripDetails(tripId: number) {
  const response = await api.get<Trip>(`/trips/${tripId}/`); // Use axios instance
  return response.data;
}

export default api;

