import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logoutUser } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';
import { colors, spacing, typography, borderRadius, shadows, getTheme } from '../utils/theme';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isDark } = useSelector((state) => state.theme);
  const theme = getTheme(isDark);
  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  const handleToggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={styles.avatarContainer}>
          <Feather name="user" size={50} color={colors.primary} />
        </View>
        <Text style={[styles.username, { color: theme.text }]}>{userName}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>{user?.email || user?.username}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Feather name="moon" size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={handleToggleDarkMode}
            trackColor={{ false: '#D1D5DB', true: colors.primary }}
            thumbColor={isDark ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#D1D5DB"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xxl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
    ...shadows.medium,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  username: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
  },
  section: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    ...shadows.medium,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingText: {
    ...typography.body,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: 'auto',
    ...shadows.medium,
  },
  logoutText: {
    color: '#fff',
    ...typography.body,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
});
