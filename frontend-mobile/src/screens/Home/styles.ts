import styled from '@emotion/native';
import { Theme } from '@emotion/react';
import { DonateBanner } from '@pf/components';
import { StyleSheet, ViewStyle } from 'react-native';

export const StyledDonateBanner = styled(DonateBanner)`
  margin-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const getStyles = (theme: Theme): { [key in 'scrollView' | 'content']: ViewStyle } =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: theme.colors.primary,
    },
    content: {
      backgroundColor: theme.colors.white,
    },
  });
