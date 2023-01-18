import { Theme } from '@emotion/react';
import { StyleSheet, ViewStyle } from 'react-native';

export const getStyles = (theme: Theme): { [key in 'scrollView' | 'content']: ViewStyle } =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: theme.colors.primary,
    },
    content: {
      backgroundColor: theme.colors.white,
    },
  });
