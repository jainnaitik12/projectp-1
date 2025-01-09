import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentReducer from './slices/admin/studentSlice';
import companyReducer from './slices/admin/companySlice';
import placementReducer from './slices/admin/placementSlice';
import templateReducer from './slices/admin/templateSlice';
import reportReducer from './slices/admin/reportSlice';
import settingsReducer from './slices/admin/settingsSlice';
import notificationReducer from './slices/admin/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    companies: companyReducer,
    placements: placementReducer,
    templates: templateReducer,
    reports: reportReducer,
    settings: settingsReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export the state and dispatch functions directly
export const getState = store.getState;
export const dispatch = store.dispatch; 