
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = 'coursely_user_v1';

// Hardcoded dummy user for testing (currently commented out in favor of API)
/* const DUMMY_USER = {
  username: 'TharushiD',
  password: 'Sample@123',
  name: 'Tharushi De Silva',
  email: 'tharushi@example.com',
}; */

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      
      // DummyJSON API call
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || 'Invalid credentials');
      }

      const user = {
        username: data.username,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        token: data.token || '',
      };

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      // Handle network errors
      if (err.message === 'Network request failed' || err.message.includes('fetch')) {
        return rejectWithValue('Network error. Please check your internet connection.');
      }
      return rejectWithValue(err.message || 'Login failed. Please try again.');
    }
  }
);

export const loadStoredUser = createAsyncThunk(
  'auth/loadStoredUser',
  async (_, { rejectWithValue }) => {
    try {
      const raw = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load user');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
  return null;
});

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // small synchronous helpers if you want them
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = !!action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(loadStoredUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = !!action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
