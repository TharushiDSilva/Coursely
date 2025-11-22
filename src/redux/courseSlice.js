import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourses } from '../api/coursesApi';

export const loadCourses = createAsyncThunk(
  'courses/loadCourses',
  async (_, { rejectWithValue }) => {
    try {
      const courses = await fetchCourses();
      return courses;
    } catch (err) {
      // Handle network errors
      if (err.message === 'Network Error' || err.message.includes('Network request failed')) {
        return rejectWithValue('Network error. Please check your internet connection.');
      }
      return rejectWithValue(err.message || 'Failed to load courses. Please try again.');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load courses';
      });
  },
});

export default courseSlice.reducer;
