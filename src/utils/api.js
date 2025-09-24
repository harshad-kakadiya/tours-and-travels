import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/user/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

// Hotel Room API functions
export const hotelAPI = {
  // Fetch list of hotel rooms (array)
  list: async (params = {}) => {
    const response = await api.get('/hotelRoom', { params });
    // Expect API may return either { data: [...] } or array directly
    const payload = response.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    // Some backends wrap on { message, data: { items: [] } }
    if (Array.isArray(payload?.data?.items)) return payload.data.items;
    return [];
  },

  // Fetch single hotel room by id
  getById: async (id) => {
    const response = await api.get(`/hotelRoom/${id}`);
    const payload = response.data;
    // Provided example returns { message, data: { ...object } }
    if (payload?.data) return payload.data;
    return payload;
  }
};

export default api;
