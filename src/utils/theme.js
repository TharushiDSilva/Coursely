export const colors = {
  primary: '#28a2b8ff',
  primaryLight: '#1A9DB3',
  primaryDark: '#0D5A6B',
  secondary: '#F4A261',
  accent: '#8B7FFF',
  accentLight: '#A599FF',
  success: '#2A9D8F',
  danger: '#E63946',
  warning: '#F4A261',
  info: '#457B9D',
  
  // Light theme
  background: '#F5F7FA',
  backgroundSecondary: '#FFFFFF',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1E1E2D',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  
  // Dark theme
  backgroundDark: '#000000',
  backgroundSecondaryDark: '#0A0A0A',
  surfaceDark: '#6e6e6eff',
  cardDark: '#1e1e1fff',
  textDark: '#FFFFFF',
  textSecondaryDark: '#1A9DB3',
  textLightDark: '#8B8BA7',
  borderDark: '#2A2A2A',
  
  heart: '#c54e4eff',
  star: '#febd88ff',
  purple: '#66ebffff',
  purpleLight: '#A599FF',
  purpleDark: '#020202ff',
};

export const getTheme = (isDark) => ({
  background: isDark ? colors.backgroundDark : colors.background,
  backgroundSecondary: isDark ? colors.backgroundSecondaryDark : colors.backgroundSecondary,
  surface: isDark ? colors.surfaceDark : colors.surface,
  card: isDark ? colors.cardDark : colors.card,
  text: isDark ? colors.textDark : colors.text,
  textSecondary: isDark ? colors.textSecondaryDark : colors.textSecondary,
  textLight: isDark ? colors.textLightDark : colors.textLight,
  border: isDark ? colors.borderDark : colors.border,
  isDark,
});

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 50,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const cardStyles = {
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  padding: spacing.lg,
  marginBottom: spacing.lg,
};
