import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placementService from '../../../services/admin/placementService';

const initialState = {
  placements: [],
  selectedPlacement: null,
  filters: {
    search: '',
    company: [],
    batch: [],
    status: [],
    dateRange: null,
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  statistics: {
    totalPlacements: 0,
    averagePackage: 0,
    highestPackage: 0,
    placementRate: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchPlacements = createAsyncThunk(
  'placements/fetchPlacements',
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await placementService.getPlacements(filters, pagination);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch placements');
    }
  }
);

export const createPlacement = createAsyncThunk(
  'placements/createPlacement',
  async (placementData, { rejectWithValue }) => {
    try {
      const response = await placementService.createPlacement(placementData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create placement');
    }
  }
);

export const updatePlacement = createAsyncThunk(
  'placements/updatePlacement',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await placementService.updatePlacement(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update placement');
    }
  }
);

export const deletePlacement = createAsyncThunk(
  'placements/deletePlacement',
  async (id, { rejectWithValue }) => {
    try {
      await placementService.deletePlacement(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete placement');
    }
  }
);

export const fetchPlacementStatistics = createAsyncThunk(
  'placements/fetchStatistics',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await placementService.getStatistics(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch statistics');
    }
  }
);

const placementSlice = createSlice({
  name: 'placements',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSelectedPlacement: (state, action) => {
      state.selectedPlacement = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Placements
      .addCase(fetchPlacements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPlacements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.placements = action.payload.placements;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchPlacements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Placement
      .addCase(createPlacement.fulfilled, (state, action) => {
        state.placements.unshift(action.payload);
        state.pagination.total += 1;
      })
      // Update Placement
      .addCase(updatePlacement.fulfilled, (state, action) => {
        const index = state.placements.findIndex(
          (placement) => placement.id === action.payload.id
        );
        if (index !== -1) {
          state.placements[index] = action.payload;
        }
      })
      // Delete Placement
      .addCase(deletePlacement.fulfilled, (state, action) => {
        state.placements = state.placements.filter(
          (placement) => placement.id !== action.payload
        );
        state.pagination.total -= 1;
      })
      // Fetch Statistics
      .addCase(fetchPlacementStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export const { setFilters, setPagination, setSelectedPlacement, resetFilters } =
  placementSlice.actions;
export default placementSlice.reducer; 