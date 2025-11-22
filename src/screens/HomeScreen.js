import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { loadCourses } from '../redux/courseSlice';
import { addFavorite, removeFavorite, loadFavoritesFromStorage } from '../redux/favoriteSlice';
import { colors, spacing, getTheme } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);
  const favorites = useSelector((state) => state.favorites.items);
  const { isDark } = useSelector((state) => state.theme);
  const theme = getTheme(isDark);

  useEffect(() => {
    dispatch(loadCourses());
    dispatch(loadFavoritesFromStorage());
  }, []);

  const handleToggleFavorite = (course) => {
    const isFav = favorites.some((fav) => fav.id === course.id);
    if (isFav) {
      dispatch(removeFavorite(course.id));
    } else {
      dispatch(addFavorite(course));
    }
  };

  const handlePress = (course) => {
    navigation.navigate('Details', { course });
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header />
      <View style={[styles.pageHeader, { backgroundColor: theme.background }]}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>Explore Courses</Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isFav = favorites.some((fav) => fav.id === item.id);
          return (
            <CourseCard
              item={item}
              onPress={() => handlePress(item)}
              onFav={() => handleToggleFavorite(item)}
              isFav={isFav}
            />
          );
        }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageHeader: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  list: {
    paddingVertical: spacing.lg,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
