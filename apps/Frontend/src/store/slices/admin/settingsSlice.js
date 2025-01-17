import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingsService from '../../../services/admin/settingsService';

const initialState = {
  settings: {
    general: {
      instituteName: '',
      logo: null,
      contactEmail: '',
      contactPhone: '',
      address: '',
      website: '',
    },
    academic: {
      currentBatch: '',
      currentSemester: '',
      branches: [],
      sections: [],
      gradeSystem: {},
    },
    placement: {
      minimumCGPA: 0,
      maximumBacklogs: 0,
      allowMultipleOffers: false,
      blockIfPlaced: false,
      defaultPackageUnit: 'LPA',
    },
    email: {
      provider: 'smtp',
      from: '',
      replyTo: '',
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPassword: '',
      useSSL: true,
    },
    notifications: {
      enableEmailNotifications: true,
      enablePushNotifications: false,
      notifyOnNewCompany: true,
      notifyOnNewPlacement: true,
      notifyOnDocumentApproval: true,
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
      },
      sessionTimeout: 30, // minutes
      maxLoginAttempts: 5,
      twoFactorAuth: false,
    }
  },
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await settingsService.getSettings();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch settings');
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      const response = await settingsService.updateSettings(settingsData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update settings');
    }
  }
);

export const uploadLogo = createAsyncThunk(
  'settings/uploadLogo',
  async (file, { rejectWithValue }) => {
    try {
      const response = await settingsService.uploadLogo(file);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to upload logo');
    }
  }
);

export const testEmailSettings = createAsyncThunk(
  'settings/testEmail',
  async (emailConfig, { rejectWithValue }) => {
    try {
      const response = await settingsService.testEmailSettings(emailConfig);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to test email settings');
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateGeneralSettings: (state, action) => {
      state.settings.general = {
        ...state.settings.general,
        ...action.payload,
      };
    },
    updateAcademicSettings: (state, action) => {
      state.settings.academic = {
        ...state.settings.academic,
        ...action.payload,
      };
    },
    updatePlacementSettings: (state, action) => {
      state.settings.placement = {
        ...state.settings.placement,
        ...action.payload,
      };
    },
    updateEmailSettings: (state, action) => {
      state.settings.email = {
        ...state.settings.email,
        ...action.payload,
      };
    },
    updateNotificationSettings: (state, action) => {
      state.settings.notifications = {
        ...state.settings.notifications,
        ...action.payload,
      };
    },
    updateSecuritySettings: (state, action) => {
      state.settings.security = {
        ...state.settings.security,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Settings
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upload Logo
      .addCase(uploadLogo.fulfilled, (state, action) => {
        state.settings.general.logo = action.payload.logo;
      });
  },
});

export const {
  updateGeneralSettings,
  updateAcademicSettings,
  updatePlacementSettings,
  updateEmailSettings,
  updateNotificationSettings,
  updateSecuritySettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 