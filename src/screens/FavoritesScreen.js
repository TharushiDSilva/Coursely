import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CourseCard from '../components/CourseCard';
import { addFavorite, removeFavorite, loadFavoritesFromStorage } from '../redux/favoriteSlice';
import { colors, spacing, typography, getTheme } from '../utils/theme';

export default function FavoritesScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.items);
  const { isDark } = useSelector((state) => state.theme);
  const theme = getTheme(isDark);

  useEffect(() => {
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
    navigation.navigate('HomeTab', {
      screen: 'Details',
      params: { course },
    });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No favorites yet</Text>
      <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Start adding courses to your favorites!
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            item={item}
            onPress={() => handlePress(item)}
            onFav={() => handleToggleFavorite(item)}
            isFav={true}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    ...typography.body,
  },
});
