// itmsv3/src/lib/mock-api.ts

import { mockDestinations } from './mockfolder/mock-destinations';
import { mockTrips } from './mockfolder/mock-trips';
import { mockVehicles } from './mockfolder/mock-vehicles';
import { mockDrivers } from './mockfolder/mock-drivers';
import { mockBookings } from './mockfolder/mock-bookings';
import { mockTransportCompanies } from './mockfolder/mock-transport-companies';
import { mockUsers } from './mockfolder/mock-users';
import { mockFeedback } from './mockfolder/mock-feedback';
import { mockViolations } from './mockfolder/mock-violations';
import { mockNotifications } from './mockfolder/mock-notifications';
import { 
  Destination, Trip, Vehicle, Driver, Booking, TransportCompany,
  User, Feedback, VehicleViolation, Notification, MockResponse 
} from '../types/types';

class MockAPI {
  // Destinations
  async getDestinations(): Promise<MockResponse<Destination[]>> {
    return { data: mockDestinations };
  }

  async getDestination(id: number): Promise<MockResponse<Destination>> {
    const destination = mockDestinations.find(d => d.id === id);
    if (!destination) throw new Error('Destination not found');
    return { data: destination };
  }

  // Trips
  async getTrips(): Promise<MockResponse<Trip[]>> {
    return { data: mockTrips };
  }

  async getTrip(id: number): Promise<MockResponse<Trip>> {
    const trip = mockTrips.find(t => t.id === id);
    if (!trip) throw new Error('Trip not found');
    return { data: trip };
  }

  async getAvailableTrips(params?: any): Promise<MockResponse<Trip[]>> {
    const availableTrips = mockTrips.filter(t => t.status === 'scheduled');
    return { data: availableTrips };
  }

  // Vehicles
  async getVehicles(): Promise<MockResponse<Vehicle[]>> {
    return { data: mockVehicles };
  }

  async getVehicle(id: number): Promise<MockResponse<Vehicle>> {
    const vehicle = mockVehicles.find(v => v.id === id);
    if (!vehicle) throw new Error('Vehicle not found');
    return { data: vehicle };
  }

  // Drivers
  async getDrivers(): Promise<MockResponse<Driver[]>> {
    return { data: mockDrivers };
  }

  async getDriver(id: number): Promise<MockResponse<Driver>> {
    const driver = mockDrivers.find(d => d.id === id);
    if (!driver) throw new Error('Driver not found');
    return { data: driver };
  }

  // Bookings
  async getBookings(): Promise<MockResponse<Booking[]>> {
    return { data: mockBookings };
  }

  async getBooking(id: number): Promise<MockResponse<Booking>> {
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return { data: booking };
  }

  // Add createBooking method
  async createBooking(bookingData: any): Promise<MockResponse<Booking>> {
    const newBooking: Booking = {
      id: mockBookings.length + 1,
      trip: mockTrips.find(t => t.id === bookingData.destination_id)!, // Adjust as needed
      passenger_name: bookingData.passengerName || "Unknown Passenger",
      passenger_contact: bookingData.passengerContact || "Unknown Contact",
      booking_code: `BOOK${Math.floor(100000 + Math.random() * 900000)}`,
      status: "confirmed",
      created_at: new Date().toISOString(),
      total_passengers: bookingData.total_passengers || 1,
      total_packages: bookingData.total_packages || 0,
      passenger_info: [],
      package_info: [],
    }
    mockBookings.push(newBooking)
    return { data: newBooking }
  }

  // Transport Companies
  async getTransportCompanies(): Promise<MockResponse<TransportCompany[]>> {
    return { data: mockTransportCompanies };
  }

  // Users
  async getUsers(): Promise<MockResponse<User[]>> {
    return { data: mockUsers };
  }

  // Feedback
  async getFeedback(): Promise<MockResponse<Feedback[]>> {
    return { data: mockFeedback };
  }

  // Violations
  async getViolations(): Promise<MockResponse<VehicleViolation[]>> {
    return { data: mockViolations };
  }

  // Notifications
  async getNotifications(): Promise<MockResponse<Notification[]>> {
    return { data: mockNotifications };
  }
}

export const mockAPI = new MockAPI();

// Export individual functions for direct use
export const getAvailableTrips = async (params?: any) => mockAPI.getAvailableTrips(params);
export const getDestinations = async () => mockAPI.getDestinations();
export const createBooking = async (bookingData: any) => mockAPI.createBooking(bookingData);