import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveDarkMode, loadDarkMode } from '../utils/storage';

// Load dark mode preference on app startup
export const loadThemeFromStorage = createAsyncThunk(
  'theme/loadFromStorage',
  async () => {
    const isDark = await loadDarkMode();
    return isDark;
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      saveDarkMode(state.isDark);
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
      saveDarkMode(state.isDark);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadThemeFromStorage.fulfilled, (state, action) => {
      state.isDark = action.payload;
    });
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
