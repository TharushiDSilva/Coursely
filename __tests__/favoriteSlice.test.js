// __tests__/favoriteSlice.test.js
import favoriteReducer, {
  addFavorite,
  removeFavorite,
  // thunk to access type string
  loadFavoritesFromStorage,
} from '../src/redux/favoriteSlice';

describe('favoriteSlice reducer', () => {
  const initialState = {
    items: [],
    loading: false,
  };

  it('should return the initial state', () => {
    expect(favoriteReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add a favorite item', () => {
    const course = { id: '1', title: 'Test Course' };
    const next = favoriteReducer(initialState, addFavorite(course));
    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toEqual(course);
  });

  it('should not add duplicate favorites', () => {
    const course = { id: '1', title: 'Test Course' };
    let state = favoriteReducer(initialState, addFavorite(course));
    state = favoriteReducer(state, addFavorite(course)); // try add duplicate
    expect(state.items).toHaveLength(1);
  });

  it('should remove a favorite by id', () => {
    const prev = { items: [{ id: '1', title: 'A' }, { id: '2', title: 'B' }], loading: false };
    const next = favoriteReducer(prev, removeFavorite('1'));
    expect(next.items).toHaveLength(1);
    expect(next.items[0].id).toBe('2');
  });

  it('should set items on loadFavoritesFromStorage.fulfilled', () => {
    const stored = [{ id: 'x', title: 'Stored' }];
    const next = favoriteReducer(initialState, { type: loadFavoritesFromStorage.fulfilled.type, payload: stored });
    expect(next.loading).toBe(false);
    expect(next.items).toEqual(stored);
  });

  it('should set loading true on loadFavoritesFromStorage.pending', () => {
    const next = favoriteReducer(initialState, { type: loadFavoritesFromStorage.pending.type });
    expect(next.loading).toBe(true);
  });

  it('should set loading false on loadFavoritesFromStorage.rejected', () => {
    const next = favoriteReducer(initialState, { type: loadFavoritesFromStorage.rejected.type });
    expect(next.loading).toBe(false);
  });
});
