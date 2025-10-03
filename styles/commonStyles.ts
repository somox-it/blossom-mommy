
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#8B9DC3',     // Soft pastel blue
  secondary: '#DDB892',   // Warm beige
  accent: '#F8AD9D',      // Light coral/pink
  highlight: '#F7DC6F',   // Light yellow
  background: '#FAFAFA',  // Very light gray
  surface: '#FFFFFF',     // Pure white
  text: '#2C3E50',        // Dark gray
  textLight: '#7F8C8D',   // Medium gray
  border: '#E8E8E8',      // Light border
  success: '#A8E6CF',     // Light green
  warning: '#FFD93D',     // Yellow
  error: '#FF6B6B'        // Light red
};

export const commonStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,

  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  } as ViewStyle,

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  } as ViewStyle,

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'OpenSans_600SemiBold',
  } as TextStyle,

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'OpenSans_700Bold',
  } as TextStyle,

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'OpenSans_600SemiBold',
  } as TextStyle,

  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontFamily: 'OpenSans_400Regular',
  } as TextStyle,

  textLight: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    fontFamily: 'OpenSans_400Regular',
  } as TextStyle,

  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  } as ViewStyle,

  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  } as TextStyle,

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: 16,
    fontFamily: 'OpenSans_400Regular',
  } as ViewStyle,

  tag: {
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
  } as TextStyle,

  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  } as ViewStyle,

  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  } as ViewStyle,

  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  } as ViewStyle,

  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    fontFamily: 'OpenSans_600SemiBold',
  } as TextStyle,

  progressSubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
    fontFamily: 'OpenSans_400Regular',
  } as TextStyle,
});

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
  } as ViewStyle,

  secondary: {
    backgroundColor: colors.secondary,
  } as ViewStyle,

  accent: {
    backgroundColor: colors.accent,
  } as ViewStyle,

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  } as ViewStyle,

  outlineText: {
    color: colors.primary,
  } as TextStyle,
});
