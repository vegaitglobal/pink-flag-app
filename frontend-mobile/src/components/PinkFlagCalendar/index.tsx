/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTheme } from '@emotion/react';
import React, { useMemo } from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { getCalendarTheme } from './getCalendarTheme';
import { Arrow, CustomHeader, DisabledOverlay } from './components';
import { ConfigureCalendar } from './config';
import { MarkerStyles } from './types';
import { View } from 'react-native';
import { subtractYears } from '@pf/utils';

ConfigureCalendar();
const TODAY = new Date();
const MIN_DATE = subtractYears(TODAY, 10);

interface OwnProps {
  isDisabled?: boolean;
  maxDate?: string;
}

type Props = CalendarProps & OwnProps;

export const PinkFlagCalendar: React.FC<Props> = ({
  isDisabled = false,
  maxDate,
  markedDates,

  ...props
}) => {
  const theme = useTheme();
  const calendarTheme = useMemo(() => getCalendarTheme(theme), [theme]);

  return (
    <View>
      <Calendar
        firstDay={1}
        current={TODAY.toString()}
        minDate={MIN_DATE.toString()}
        maxDate={maxDate}
        disabledByDefault={isDisabled}
        renderArrow={direction => <Arrow direction={direction} />}
        renderHeader={(date: Date) => <CustomHeader date={date} />}
        enableSwipeMonths={true}
        theme={calendarTheme}
        markingType="custom"
        markedDates={markedDates}
        {...props}
      />
      {isDisabled && <DisabledOverlay />}
    </View>
  );
};

export { MarkerStyles };
