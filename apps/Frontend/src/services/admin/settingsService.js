import axios from '../../config/axios';
import { API_BASE_URL } from '../../config/constants';

const settingsService = {
  getSettings: async () => {
    const response = await axios.get(`${API_BASE_URL}/settings`);
    return response.data;
  },

  updateSettings: async (settingsData) => {
    const response = await axios.put(`${API_BASE_URL}/settings`, settingsData);
    return response.data;
  },

  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await axios.post(`${API_BASE_URL}/settings/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  testEmailSettings: async (emailConfig) => {
    const response = await axios.post(`${API_BASE_URL}/settings/test-email`, emailConfig);
    return response.data;
  },

  getBranches: async () => {
    const response = await axios.get(`${API_BASE_URL}/settings/branches`);
    return response.data;
  },

  updateBranches: async (branches) => {
    const response = await axios.put(`${API_BASE_URL}/settings/branches`, { branches });
    return response.data;
  },

  getGradeSystem: async () => {
    const response = await axios.get(`${API_BASE_URL}/settings/grade-system`);
    return response.data;
  },

  updateGradeSystem: async (gradeSystem) => {
    const response = await axios.put(`${API_BASE_URL}/settings/grade-system`, {
      gradeSystem,
    });
    return response.data;
  },

  backupData: async () => {
    const response = await axios.post(`${API_BASE_URL}/settings/backup`);
    return response.data;
  },

  restoreData: async (file) => {
    const formData = new FormData();
    formData.append('backup', file);

    const response = await axios.post(`${API_BASE_URL}/settings/restore`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default settingsService; 