import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoriteSlice';
import { colors, spacing, typography, borderRadius, getTheme } from '../utils/theme';

export default function DetailsScreen({ route }) {
  const { course } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const { isDark } = useSelector((state) => state.theme);
  const theme = getTheme(isDark);
  const isFav = favorites.some((fav) => fav.id === course.id);

  const handleToggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(course.id));
    } else {
      dispatch(addFavorite(course));
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: course.image }} style={styles.image} />
      
      <View style={[styles.content, { backgroundColor: theme.card }]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{course.title}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{course.category}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favButton}>
            <Feather
              name="heart"
              size={28}
              color={isFav ? colors.heart : colors.textLight}
              fill={isFav ? colors.heart : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <Feather name="star" size={20} color={colors.star} />
          <Text style={[styles.rating, { color: theme.text }]}>{course.rating}</Text>
          <Text style={[styles.ratingText, { color: theme.textSecondary }]}>Rating</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>{course.description}</Text>

        {course.author && (
          <View style={styles.infoRow}>
            <Feather name="user" size={16} color={theme.textSecondary} />
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>Author: {course.author}</Text>
          </View>
        )}

        {course.publishYear && (
          <View style={styles.infoRow}>
            <Feather name="calendar" size={16} color={theme.textSecondary} />
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>Published: {course.publishYear}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.xxl,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  favButton: {
    padding: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  rating: {
    ...typography.h3,
    marginLeft: spacing.sm,
  },
  ratingText: {
    ...typography.body,
    marginLeft: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    ...typography.body,
    marginLeft: spacing.sm,
  },
  enrollButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    marginTop: spacing.lg,
  },
  enrollButtonText: {
    ...typography.h4,
    color: colors.surface,
  },
});
