/* eslint-env jest */
// __tests__/authSlice.test.js
import authReducer, {
  setUser,
  // the thunks are used only to get action.type strings for reducer tests
  loginUser,
  loadStoredUser,
  logoutUser,
} from '../src/redux/authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  };

  it('should return the initial state when passed an unknown action', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser (synchronous)', () => {
    const user = { username: 'jane', email: 'jane@example.com' };
    const nextState = authReducer(initialState, setUser(user));
    expect(nextState.user).toEqual(user);
    expect(nextState.isLoggedIn).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle loginUser.pending -> sets loading true', () => {
    const next = authReducer(initialState, { type: loginUser.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('should handle loginUser.fulfilled -> set user and isLoggedIn', () => {
    const userPayload = { username: 'kminchelle', email: 'k@example.com', token: 'abc' };
    const next = authReducer(initialState, { type: loginUser.fulfilled.type, payload: userPayload });
    expect(next.loading).toBe(false);
    expect(next.user).toEqual(userPayload);
    expect(next.isLoggedIn).toBe(true);
    expect(next.error).toBeNull();
  });

  it('should handle loginUser.rejected -> set error and clear loading', () => {
    const errMsg = 'Invalid credentials';
    const next = authReducer(initialState, { type: loginUser.rejected.type, payload: errMsg });
    expect(next.loading).toBe(false);
    expect(next.error).toBe(errMsg);
  });

  it('should handle loadStoredUser.fulfilled -> populate user and isLoggedIn', () => {
    const storedUser = { username: 'storedUser' };
    const next = authReducer(initialState, { type: loadStoredUser.fulfilled.type, payload: storedUser });
    expect(next.user).toEqual(storedUser);
    expect(next.isLoggedIn).toBe(true);
  });

  it('should handle logoutUser.fulfilled -> clear user and isLoggedIn', () => {
    const prev = { ...initialState, user: { username: 'u' }, isLoggedIn: true };
    const next = authReducer(prev, { type: logoutUser.fulfilled.type });
    expect(next.user).toBeNull();
    expect(next.isLoggedIn).toBe(false);
    expect(next.error).toBeNull();
  });
});
