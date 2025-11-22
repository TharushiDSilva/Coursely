import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
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

  const settingsOptions = [
    {
      id: 'darkmode',
      icon: 'moon',
      title: 'Dark Mode',
      type: 'toggle',
      value: isDark,
      onPress: handleToggleDarkMode,
      color: colors.purple,
    },
    {
      id: 'notifications',
      icon: 'bell',
      title: 'Push Notification',
      type: 'toggle',
      value: true,
      color: colors.primary,
    },
    {
      id: 'email',
      icon: 'mail',
      title: 'Email Notification',
      type: 'toggle',
      value: false,
      color: colors.secondary,
    },
  ];

  const otherOptions = [
    {
      id: 'categories',
      icon: 'grid',
      title: 'Preferred Categories',
      type: 'navigation',
      color: colors.info,
    },
    {
      id: 'history',
      icon: 'clock',
      title: 'Search History',
      type: 'navigation',
      color: colors.warning,
    },
    {
      id: 'delete',
      icon: 'trash-2',
      title: 'Delete Account',
      type: 'navigation',
      color: colors.danger,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={[styles.pageHeader, { backgroundColor: theme.background }]}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>My Profile</Text>
      </View>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.card }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
              <Feather name="user" size={40} color={colors.primary} />
            </View>
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>{userName}</Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user?.email || user?.username}
          </Text>
        </View>

      {/* Notifications Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifications Settings</Text>
        {settingsOptions.map((option) => (
          <View
            key={option.id}
            style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: option.color + '15' }]}>
                <Feather name={option.icon} size={20} color={option.color} />
              </View>
              <Text style={[styles.settingTitle, { color: theme.text }]}>{option.title}</Text>
            </View>
            <Switch
              value={option.value}
              onValueChange={option.onPress}
              trackColor={{ false: theme.border, true: colors.purple + '80' }}
              thumbColor={option.value ? colors.purple : '#f4f3f4'}
              ios_backgroundColor={theme.border}
            />
          </View>
        ))}
      </View>

      {/* Other Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Other Settings</Text>
        {otherOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: option.color + '15' }]}>
                <Feather name={option.icon} size={20} color={option.color} />
              </View>
              <Text style={[styles.settingTitle, { color: theme.text }]}>{option.title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: isDark ? colors.danger + '20' : colors.danger }]}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color={isDark ? colors.danger : '#fff'} />
        <Text style={[styles.logoutText, { color: isDark ? colors.danger : '#fff' }]}>Logout</Text>
      </TouchableOpacity>
      
      <View style={{ height: 40 }} />
      </ScrollView>
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
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary + '30',
  },
  userName: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
    fontSize: 16,
    fontWeight: '600',
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    ...shadows.medium,
  },
  logoutText: {
    ...typography.body,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
});
