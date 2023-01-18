import styled from '@emotion/native';
import { PinkFlagCalendar } from '@pf/components';
import { unit } from '@pf/utils';
import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from 'theme';

const EXPLANATION_TOP = 40;
const EXPLANATION_BOTTOM = 72;
const CALENDAR_PADDING = 4;

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ExplanationWrapper = styled.View`
  margin-top: ${unit(EXPLANATION_TOP)};
  margin-bottom: ${unit(EXPLANATION_BOTTOM)};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const getStyles = (theme: Theme): { [key in 'container' | 'content']: ViewStyle } =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    content: {
      backgroundColor: theme.colors.white,
    },
  });

export const StyledPinkFlagCalendar = styled(PinkFlagCalendar)`
  padding-horizontal: ${unit(CALENDAR_PADDING)};
`;
