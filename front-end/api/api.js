import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api';

const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data);
        throw error;  // Handle this error on the frontend (display error message to the user)
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', userData);
        return response.data;  // This should return the login response
    } catch (error) {
        throw error;  // Handle error here
    }
};
export const getFlights = () => api.get('/flights');
export const bookFlight = (data) => api.post('/bookings', data);
export const cancelBooking = (bookingId) => api.post(`/bookings/${bookingId}/cancel`);
export const processPayment = (data) => api.post('/payments', data);

export default api;
