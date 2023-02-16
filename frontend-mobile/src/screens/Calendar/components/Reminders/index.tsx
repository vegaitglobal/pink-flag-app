import React, { useMemo } from 'react';
import { ReminderLabel } from '@pf/components';
import { Container, Separator } from './styles';
import { getDateWithOffset, getUpcomingMenstruationStartDate } from '../../utils';
import { TODAY } from '@pf/constants';
import { getPeriodText } from './utils';

interface Props {
  cycleLength?: number;
  menstruationLength?: number;
  menstruationStartDate?: string;
}

export const Reminders: React.FC<Props> = ({ cycleLength, menstruationLength, menstruationStartDate }) => {
  const menstruationStart = useMemo(
    () => getDateWithOffset(menstruationStartDate || '', cycleLength || 0, TODAY),
    [cycleLength, menstruationStartDate],
  );
  const upcomingMenstruationStart = useMemo(
    () => getUpcomingMenstruationStartDate(menstruationStart, cycleLength || 0),
    [cycleLength, menstruationStart],
  );

  const periodText = getPeriodText(menstruationStart, upcomingMenstruationStart, menstruationLength);

  return (
    <Container>
      <ReminderLabel content={periodText} />
      <Separator />
      <ReminderLabel content="Ovulacija dolazi za 2 dana!" type="ovulation" />
    </Container>
  );
};
