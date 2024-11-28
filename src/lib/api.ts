import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Update with your backend URL
    withCredentials: true, // Include cookies
});

// Request interceptor to include CSRF token
api.interceptors.request.use((config) => {
    (async () => {
        const csrfToken = await getCsrfToken();
        if (csrfToken) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers['X-CSRFToken'] = csrfToken;
        }
    })();
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Function to get CSRF token
export const getCsrfToken = async (): Promise<string | null> => {
    try {
        const response = await api.get('/csrf/');
        const data = response.data as { csrfToken: string };
        return data.csrfToken;
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        return null;
    }
};

// Authentication APIs
export const login = async (username: string, password: string) => {
    return api.post('/api/account/login/', { username, password });
};

export const logout = async () => {
    return api.post('/api/account/logout/');
};

export const checkAuth = async () => {
    return api.get('/api/check-auth/');
};

// Booking APIs
export const createBooking = async (bookingData: {
    trip: number;
    passenger_name: string;
    passenger_contact: string;
    total_passengers: number;
    passenger_info: {
        name: string;
        age: number;
        gender: string;
    }[];
}) => {
    return api.post('/bookings/create/', bookingData);
};

export const getBookingDetail = async (bookingCode: string) => {
    return api.get(`/bookings/${bookingCode}/`);
};

export const updateBookingStatus = async (bookingId: number, statusData: any) => {
    return api.patch(`/bookings/${bookingId}/`, statusData);
};

export const cancelBooking = async (bookingId: number) => {
    return api.post(`/cancellation-request/`, { booking_id: bookingId });
};

// Notification APIs
export const getNotifications = async () => {
    return api.get('/notifications/');
};

export const markNotificationsSeen = async () => {
    return api.post('/notifications/mark-seen/');
};

// Trip APIs
export const getAvailableTrips = async (params: {
    date?: string;
    destination?: string;
    vehicleType?: string;
    transportCompany?: string;
}) => {
    return api.get('/trips/', { params });
};

export const getTripDetail = async (tripId: number) => {
    return api.get(`/trip-detail/${tripId}/`);
};

export const updateTripStatus = async (tripId: number, statusData: any) => {
    return api.patch(`/update-trip-status/${tripId}/`, statusData);
};

// Destination APIs
export const getDestinations = async () => {
    return api.get('/destinations/');
};

// Support APIs
export const contactSupport = async (supportData: any) => {
    return api.post('/contact-support/', supportData);
};

// Feedback APIs
export const submitFeedback = async (feedbackData: any) => {
    return api.post('/submit-feedback/', feedbackData);
};

export const viewFeedback = async (feedbackId: number) => {
    return api.get(`/feedback/${feedbackId}/`);
};

// Violation APIs
export const submitViolation = async (violationData: any) => {
    return api.post('/api/submit-violation/', violationData);
};

export const getViolationDetails = async (entityId: number, entityType: string) => {
    return api.get(`/violation-details/${entityId}/${entityType}/`);
};

// Driver APIs
export const getDriverInfo = async (nfcCode: string) => {
    return api.get(`/driver-info/${nfcCode}/`);
};

// QR Scan APIs
export const qrScan = async (vehicleId: number) => {
    return api.get(`/api/qr-scan/${vehicleId}/`);
};

// User Profile APIs
export const getUserProfile = async (userId: number) => {
    return api.get(`/user-profiles/${userId}/`);
};

export const updateUserProfile = async (userId: number, profileData: any) => {
    return api.put(`/user-profiles/${userId}/`, profileData);
};

// Announcement APIs
export const getAnnouncements = async () => {
    return api.get('/announcements/');
};

// Feedback for Vehicles API
export const submitFeedbackVehicles = async (vehicleId: number, feedbackData: any) => {
    return api.post(`/vehicles/${vehicleId}/feedback/`, feedbackData);
};

export const getFeedback = async (feedbackId: number) => {
    return api.get(`/feedback/${feedbackId}/`);
};

// Payment Proof Submission API
export const submitPaymentProof = async (paymentData: FormData) => {
    return api.post('/submit-payment/', paymentData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Trip Cancellation Request API
export const submitTripCancellationRequest = async (tripId: number, reason: string) => {
    return api.post('/trip-cancellation-request/', { trip_id: tripId, reason });
};

// Driver Application APIs
export const submitDriverApplication = async (applicationData: any) => {
    return api.post('/driver-applications/', applicationData);
};

export const getDriverApplications = async () => {
    return api.get('/driver-applications/');
};

// Chat APIs
export const sendMessage = async (messageData: any) => {
    return api.post('/chat/', messageData);
};

export const getMessages = async () => {
    return api.get('/chat/');
};

// Report and Audit Log APIs
export const getAuditLogs = async () => {
    return api.get('/audit-logs/');
};

export const getReports = async () => {
    return api.get('/reports/');
};

export const exportReport = async (reportData: any) => {
    return api.post('/export-report/', reportData);
};

export const getExportStatus = async (taskId: string) => {
    return api.get(`/export-report/status/${taskId}/`);
};

// Dashboard Statistics APIs
export const getDashboardStatistics = async () => {
    return api.get('/api/dashboard/stats/');
};

export const getRecentBookings = async () => {
    return api.get('/api/bookings/recent/');
};

// NFC and QR Scan APIs
export const nfcTap = async (driverId: number) => {
    return api.get(`/nfc-tap/${driverId}/`);
};

// DTR (Daily Time Record) API
export const getDriverDTR = async (driverId: number) => {
    return api.get(`/drivers/${driverId}/dtrs/`);
};

// Seat Selection APIs
export const getTripDetails = async (tripId: number) => {
    return api.get(`/trips/${tripId}/`);
};

export const getBookingsForTrip = async (tripId: number) => {
    return api.get(`/bookings/`, { 
        params: { trip_id: tripId } 
    });
};

// Add this new function to fetch transport companies
export const getTransportCompanies = async () => {
    return api.get('/transport-companies/');
};
