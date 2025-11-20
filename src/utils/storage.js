import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@coursely_favorites';
const DARK_MODE_KEY = '@coursely_dark_mode';

export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveDarkMode = async (isDark) => {
  try {
    await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Error saving dark mode:', error);
  }
};

export const loadDarkMode = async () => {
  try {
    const data = await AsyncStorage.getItem(DARK_MODE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Error loading dark mode:', error);
    return false;
  }
};
