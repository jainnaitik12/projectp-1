import axios from '../../config/axios';
import { API_BASE_URL } from '../../config/constants';

const notificationService = {
  getNotifications: async (filters, pagination) => {
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
      params: {
        ...filters,
        page: pagination.page,
        limit: pagination.rowsPerPage,
      },
    });
    return response.data;
  },

  markAsRead: async (notificationIds) => {
    const response = await axios.put(`${API_BASE_URL}/notifications/mark-read`, {
      notificationIds,
    });
    return response.data;
  },

  deleteNotifications: async (notificationIds) => {
    const response = await axios.delete(`${API_BASE_URL}/notifications`, {
      data: { notificationIds },
    });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axios.get(`${API_BASE_URL}/notifications/unread-count`);
    return response.data;
  },

  subscribeToNotifications: async (subscription) => {
    const response = await axios.post(`${API_BASE_URL}/notifications/subscribe`, subscription);
    return response.data;
  },

  unsubscribeFromNotifications: async (subscription) => {
    const response = await axios.post(`${API_BASE_URL}/notifications/unsubscribe`, subscription);
    return response.data;
  },

  updateNotificationPreferences: async (preferences) => {
    const response = await axios.put(`${API_BASE_URL}/notifications/preferences`, preferences);
    return response.data;
  },

  getNotificationPreferences: async () => {
    const response = await axios.get(`${API_BASE_URL}/notifications/preferences`);
    return response.data;
  },

  sendTestNotification: async () => {
    const response = await axios.post(`${API_BASE_URL}/notifications/test`);
    return response.data;
  },
};

export default notificationService; 