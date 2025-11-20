import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@coursely_user';

// Hardcoded dummy user
const DUMMY_USER = {
  username: 'TharushiD',
  password: 'Sample@123',
  name: 'Tharushi De Silva',
  email: 'tharushi@example.com',
};

// Load user from AsyncStorage on app startup
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error loading user from storage:', error);
      return null;
    }
  }
);

// Login user async thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate against dummy user
      if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
        const user = {
          username: DUMMY_USER.username,
          name: DUMMY_USER.name,
          email: DUMMY_USER.email,
        };
        
        // Store user in AsyncStorage
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        
        return user;
      } else {
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register user async thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        email: userData.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      // Clear AsyncStorage
      AsyncStorage.removeItem(USER_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      // Load user from storage
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
        }
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
