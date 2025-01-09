import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import templateService from '../../../services/admin/templateService';

const initialState = {
  templates: [],
  selectedTemplate: null,
  filters: {
    search: '',
    category: [],
    type: [],
    status: [],
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
  versions: [],
};

export const fetchTemplates = createAsyncThunk(
  'templates/fetchTemplates',
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await templateService.getTemplates(filters, pagination);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch templates');
    }
  }
);

export const createTemplate = createAsyncThunk(
  'templates/createTemplate',
  async (templateData, { rejectWithValue }) => {
    try {
      const response = await templateService.createTemplate(templateData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create template');
    }
  }
);

export const updateTemplate = createAsyncThunk(
  'templates/updateTemplate',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await templateService.updateTemplate(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update template');
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  'templates/deleteTemplate',
  async (id, { rejectWithValue }) => {
    try {
      await templateService.deleteTemplate(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete template');
    }
  }
);

export const fetchTemplateVersions = createAsyncThunk(
  'templates/fetchVersions',
  async (id, { rejectWithValue }) => {
    try {
      const response = await templateService.getTemplateVersions(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch versions');
    }
  }
);

export const sendTestTemplate = createAsyncThunk(
  'templates/sendTest',
  async ({ id, testData }, { rejectWithValue }) => {
    try {
      const response = await templateService.sendTestTemplate(id, testData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to send test');
    }
  }
);

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Templates
      .addCase(fetchTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload.templates;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Template
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.templates.unshift(action.payload);
        state.pagination.total += 1;
      })
      // Update Template
      .addCase(updateTemplate.fulfilled, (state, action) => {
        const index = state.templates.findIndex(
          (template) => template.id === action.payload.id
        );
        if (index !== -1) {
          state.templates[index] = action.payload;
        }
      })
      // Delete Template
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.templates = state.templates.filter(
          (template) => template.id !== action.payload
        );
        state.pagination.total -= 1;
      })
      // Fetch Versions
      .addCase(fetchTemplateVersions.fulfilled, (state, action) => {
        state.versions = action.payload;
      })
      // Send Test
      .addCase(sendTestTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendTestTemplate.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendTestTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPagination, setSelectedTemplate, resetFilters } =
  templateSlice.actions;
export default templateSlice.reducer; 