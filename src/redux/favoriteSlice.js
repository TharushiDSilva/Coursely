import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveFavorites, loadFavorites } from '../utils/storage';

// Load favorites from AsyncStorage on app startup
export const loadFavoritesFromStorage = createAsyncThunk(
  'favorites/loadFromStorage',
  async () => {
    const favorites = await loadFavorites();
    return favorites;
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        // Persist to AsyncStorage
        saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Persist to AsyncStorage
      saveFavorites(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoritesFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadFavoritesFromStorage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
