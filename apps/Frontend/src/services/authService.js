import axios from 'axios';
import { API_BASE_URL, AUTH_CONFIG } from '../config/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Mock data for development
const MOCK_USER = {
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
};

const MOCK_TOKEN = 'mock-jwt-token';

export const authService = {
  async login(credentials) {
    // For development, check if credentials match mock data
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      localStorage.setItem(AUTH_CONFIG.tokenKey, MOCK_TOKEN);
      return { user: MOCK_USER, token: MOCK_TOKEN };
    }
    throw new Error('Invalid credentials');
  },

  async getCurrentUser() {
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    if (!token) throw new Error('No token found');

    // For development, return mock user if token matches
    if (token === MOCK_TOKEN) {
      return MOCK_USER;
    }
    throw new Error('Invalid token');
  },

  async logout() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
  },

  getToken() {
    return localStorage.getItem(AUTH_CONFIG.tokenKey);
  },

  setToken(token) {
    localStorage.setItem(AUTH_CONFIG.tokenKey, token);
  },

  removeToken() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
  },
};

// Add token to all requests if it exists
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authService; 