import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import courseReducer from './courseSlice';
import favoriteReducer from './favoriteSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    favorites: favoriteReducer,
    theme: themeReducer,
  },
});
