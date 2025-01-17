import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from '../../../services/admin/reportService';

const initialState = {
  reports: [],
  selectedReport: null,
  filters: {
    type: [],
    dateRange: null,
    batch: [],
    branch: [],
    company: [],
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  generatedReport: null,
  isLoading: false,
  error: null,
};

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await reportService.getReports(filters, pagination);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch reports');
    }
  }
);

export const generateReport = createAsyncThunk(
  'reports/generateReport',
  async (reportConfig, { rejectWithValue }) => {
    try {
      const response = await reportService.generateReport(reportConfig);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to generate report');
    }
  }
);

export const scheduleReport = createAsyncThunk(
  'reports/scheduleReport',
  async (scheduleConfig, { rejectWithValue }) => {
    try {
      const response = await reportService.scheduleReport(scheduleConfig);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to schedule report');
    }
  }
);

export const downloadReport = createAsyncThunk(
  'reports/downloadReport',
  async ({ id, format }, { rejectWithValue }) => {
    try {
      const response = await reportService.downloadReport(id, format);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to download report');
    }
  }
);

export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async (id, { rejectWithValue }) => {
    try {
      await reportService.deleteReport(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete report');
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearGeneratedReport: (state) => {
      state.generatedReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reports
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports = action.payload.reports;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Generate Report
      .addCase(generateReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.generatedReport = action.payload;
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Schedule Report
      .addCase(scheduleReport.fulfilled, (state, action) => {
        state.reports.unshift(action.payload);
        state.pagination.total += 1;
      })
      // Delete Report
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.id !== action.payload
        );
        state.pagination.total -= 1;
      });
  },
});

export const {
  setFilters,
  setPagination,
  setSelectedReport,
  resetFilters,
  clearGeneratedReport,
} = reportSlice.actions;
export default reportSlice.reducer; 