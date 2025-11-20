import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, cardStyles, getTheme } from '../utils/theme';

export default function CourseCard({ item, onPress, onFav, isFav }) {
  const { isDark } = useSelector((state) => state.theme);
  const theme = getTheme(isDark);

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={onFav} style={styles.favButton}>
            <Feather
              name="heart"
              size={20}
              color={isFav ? colors.heart : colors.textLight}
              fill={isFav ? colors.heart : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <View style={styles.rating}>
            <Feather name="star" size={14} color={colors.star} />
            <Text style={[styles.ratingText, { color: theme.text }]}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.lg,
    marginBottom: cardStyles.marginBottom,
    overflow: 'hidden',
    shadowColor: '#11788C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  thumbnail: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: cardStyles.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h4,
    flex: 1,
    marginRight: spacing.md,
  },
  favButton: {
    padding: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
});
