import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourses } from '../api/coursesApi';

export const loadCourses = createAsyncThunk(
  'courses/loadCourses',
  async () => {
    const courses = await fetchCourses();
    return courses;
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
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
