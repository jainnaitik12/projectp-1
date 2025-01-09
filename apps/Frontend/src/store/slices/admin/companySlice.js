import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import companyService from '../../../services/admin/companyService';

const initialState = {
  companies: [],
  selectedCompany: null,
  filters: {
    search: '',
    industry: [],
    status: [],
    type: [],
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await companyService.getCompanies(filters, pagination);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch companies');
    }
  }
);

export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await companyService.createCompany(companyData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create company');
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await companyService.updateCompany(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update company');
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id, { rejectWithValue }) => {
    try {
      await companyService.deleteCompany(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete company');
    }
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Companies
      .addCase(fetchCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companies = action.payload.companies;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Company
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.unshift(action.payload);
        state.pagination.total += 1;
      })
      // Update Company
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      // Delete Company
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload
        );
        state.pagination.total -= 1;
      });
  },
});

export const { setFilters, setPagination, setSelectedCompany, resetFilters } =
  companySlice.actions;
export default companySlice.reducer; 