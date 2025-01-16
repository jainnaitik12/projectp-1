import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentService from '../../../services/admin/studentService';

const initialState = {
  students: [],
  selectedStudent: null,
  filters: {
    search: '',
    batch: [],
    branch: [],
    status: [],
    placementStatus: [],
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await studentService.getStudents(filters, pagination);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch students');
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await studentService.createStudent(studentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await studentService.updateStudent(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete student');
    }
  }
);

export const bulkImportStudents = createAsyncThunk(
  'students/bulkImport',
  async (fileData, { rejectWithValue }) => {
    try {
      const response = await studentService.bulkImport(fileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to import students');
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload.students;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.unshift(action.payload);
        state.pagination.total += 1;
      })
      // Update Student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      // Delete Student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
        state.pagination.total -= 1;
      })
      // Bulk Import
      .addCase(bulkImportStudents.fulfilled, (state, action) => {
        state.students = [...state.students, ...action.payload.students];
        state.pagination.total += action.payload.students.length;
      });
  },
});

export const { setFilters, setPagination, setSelectedStudent, resetFilters } =
  studentSlice.actions;
export default studentSlice.reducer; 