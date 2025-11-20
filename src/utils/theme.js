export const colors = {
  primary: '#11788C',
  primaryLight: '#1A9DB3',
  primaryDark: '#0D5A6B',
  secondary: '#F4A261',
  accent: '#E76F51',
  success: '#2A9D8F',
  danger: '#E63946',
  warning: '#F4A261',
  info: '#457B9D',
  
  background: '#F8F9FA',
  backgroundDark: '#1A1A1A',
  surface: '#FFFFFF',
  surfaceDark: '#2C2C2C',
  card: '#FFFFFF',
  cardDark: '#363636',
  
  text: '#2B2D42',
  textDark: '#FFFFFF',
  textSecondary: '#6C757D',
  textSecondaryDark: '#ADB5BD',
  textLight: '#999999',
  border: '#DEE2E6',
  borderDark: '#495057',
  
  heart: '#E63946',
  star: '#F4A261',
};

export const getTheme = (isDark) => ({
  background: isDark ? colors.backgroundDark : colors.background,
  surface: isDark ? colors.surfaceDark : colors.surface,
  card: isDark ? colors.cardDark : colors.card,
  text: isDark ? colors.textDark : colors.text,
  textSecondary: isDark ? colors.textSecondaryDark : colors.textSecondary,
  border: isDark ? colors.borderDark : colors.border,
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
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 50,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
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
