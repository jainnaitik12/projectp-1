import axios from 'axios';

const API_URL = '/api/audit';

export const auditService = {
  getLogs: async (filters = {}) => {
    try {
      const response = await axios.get(API_URL, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  exportLogs: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/export`, {
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Function to log audit events
  logEvent: async (eventData) => {
    try {
      const response = await axios.post(API_URL, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 