import axios from 'axios';

// Setting API URL to the correct backend endpoint
const API_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const register = (userData) => api.post('/register', userData);
export const login = (credentials) => api.post('/login', credentials);
export const logout = () => api.post('/logout');
export const getCurrentUser = () => api.get('/user');

// Flight API
export const getAllFlights = () => api.get('/flights');
export const searchFlights = (params) => api.get('/flights/search', { params });
export const getFlightById = (id) => api.get(`/flights/${id}`);

// Booking API
export const getUserBookings = () => api.get('/bookings');
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Payment API
export const processPayment = (paymentData) => api.post('/payments', paymentData);

// Admin API
export const getAdminFlights = () => api.get('/admin/flights');
export const createFlight = (flightData) => api.post('/admin/flights', flightData);
export const updateFlight = (id, flightData) => api.put(`/admin/flights/${id}`, flightData);
export const deleteFlight = (id) => api.delete(`/admin/flights/${id}`);
export const getAdminBookings = () => api.get('/admin/bookings');
export const getAirlines = () => api.get('/admin/airlines');

export default api;
