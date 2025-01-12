import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../../../services/admin/notificationService';

const initialState = {
  notifications: [],
  unreadCount: 0,
  filters: {
    type: [],
    read: null,
    dateRange: null,
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotifications(filters, pagination);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch notifications');
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationIds, { rejectWithValue }) => {
    try {
      const response = await notificationService.markAsRead(notificationIds);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to mark notifications as read');
    }
  }
);

export const deleteNotifications = createAsyncThunk(
  'notifications/deleteNotifications',
  async (notificationIds, { rejectWithValue }) => {
    try {
      await notificationService.deleteNotifications(notificationIds);
      return notificationIds;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete notifications');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Mark as Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const markedIds = new Set(action.payload);
        state.notifications = state.notifications.map(notification => {
          if (markedIds.has(notification.id)) {
            return { ...notification, read: true };
          }
          return notification;
        });
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      })
      // Delete Notifications
      .addCase(deleteNotifications.fulfilled, (state, action) => {
        const deletedIds = new Set(action.payload);
        state.notifications = state.notifications.filter(
          notification => !deletedIds.has(notification.id)
        );
        state.unreadCount = state.notifications.filter(n => !n.read).length;
        state.pagination.total -= action.payload.length;
      });
  },
});

export const { setFilters, setPagination, addNotification, resetFilters } =
  notificationSlice.actions;
export default notificationSlice.reducer; 