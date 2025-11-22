import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows, getTheme } from '../utils/theme';
import { toggleTheme } from '../redux/themeSlice';

export default function Header({ title }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isDark } = useSelector((state) => state.theme);
  const theme = getTheme(isDark);
  const userName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
      <View style={styles.leftSection}>
        <View style={styles.logoContainer}>
          <Image 
            source={isDark ? require('../../assets/images/2.png') : require('../../assets/images/1.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: theme.text }]}>{userName}!</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity 
          style={styles.themeButton}
          onPress={() => dispatch(toggleTheme())}
        >
          <View style={[styles.themeIcon, { backgroundColor: isDark ? '#1A1A1A' : colors.primary + '15' }]}>
            <Feather name={isDark ? 'sun' : 'moon'} size={20} color={isDark ? '#FFF' : colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <View style={[styles.notificationIcon, { backgroundColor: isDark ? '#000000ff' : colors.primary + '15' }]}>
            <Feather name="bell" size={22} color={isDark ? '#FFF' : colors.primary} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: spacing.md,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
  },
  greeting: {
    ...typography.caption,
  },
  userName: {
    ...typography.h4,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeButton: {
    position: 'relative',
  },
  themeIcon: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationIcon: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.danger,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
