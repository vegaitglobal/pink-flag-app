/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Theme } from '@emotion/react';
import { CalendarTheme } from 'react-native-calendars';

const TEXT_DISABLED_COLOR = '#8F9BB3';
const TEXT_COLOR = '#222B45';

export const getCalendarTheme = (theme: Theme): CalendarTheme => {
  const baseStyle: CalendarTheme = {
    textDisabledColor: TEXT_DISABLED_COLOR,
    weekVerticalMargin: 0,
  };

  const dayStyles: CalendarTheme = {
    textDayFontWeight: '700',
    dayTextColor: TEXT_COLOR,
    textDayFontFamily: 'Nunito-Regular',
    textDayFontSize: theme.fontSize.$4Number,
    todayTextColor: theme.colors.primary,
  };

  const dayHeaderStyles: CalendarTheme = {
    textDayHeaderFontWeight: '700',
    textDayHeaderFontFamily: 'Nunito-Regular',
    textSectionTitleColor: TEXT_DISABLED_COLOR,
    textDayHeaderFontSize: theme.fontSize.$3Number,
  };

  return {
    ...baseStyle,
    ...dayStyles,
    ...dayHeaderStyles,
  };
};
