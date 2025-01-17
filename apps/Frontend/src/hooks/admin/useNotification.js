import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchNotifications,
  markAsRead,
  deleteNotifications,
} from '../../store/slices/admin/notificationSlice';

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { notifications, unreadCount, isLoading } = useSelector(
    (state) => state.notifications
  );

  const showNotification = (message, options = {}) => {
    enqueueSnackbar(message, {
      variant: 'default',
      autoHideDuration: 3000,
      ...options,
    });
  };

  const showSuccess = (message) => {
    showNotification(message, { variant: 'success' });
  };

  const showError = (message) => {
    showNotification(message, { variant: 'error' });
  };

  const showWarning = (message) => {
    showNotification(message, { variant: 'warning' });
  };

  const showInfo = (message) => {
    showNotification(message, { variant: 'info' });
  };

  const loadNotifications = async (filters = {}, pagination = {}) => {
    try {
      await dispatch(fetchNotifications({ filters, pagination })).unwrap();
    } catch (error) {
      showError('Failed to load notifications');
      throw error;
    }
  };

  const markNotificationsAsRead = async (notificationIds) => {
    try {
      await dispatch(markAsRead(notificationIds)).unwrap();
      showSuccess('Notifications marked as read');
    } catch (error) {
      showError('Failed to mark notifications as read');
      throw error;
    }
  };

  const deleteSelectedNotifications = async (notificationIds) => {
    try {
      await dispatch(deleteNotifications(notificationIds)).unwrap();
      showSuccess('Notifications deleted successfully');
    } catch (error) {
      showError('Failed to delete notifications');
      throw error;
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    loadNotifications,
    markNotificationsAsRead,
    deleteSelectedNotifications,
  };
}; 