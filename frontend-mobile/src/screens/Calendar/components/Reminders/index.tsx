import React, { useMemo } from 'react';
import { ReminderLabel } from '@pf/components';
import { Container, Separator } from './styles';
import { getDateWithOffset, getUpcomingMenstruationStartDate } from '../../utils';
import { TODAY } from '@pf/constants';
import { getOvulationText, getPeriodText } from './utils';

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
  const periodReminder = useMemo(
    () => getPeriodText(menstruationStart, upcomingMenstruationStart, menstruationLength),
    [menstruationLength, menstruationStart, upcomingMenstruationStart],
  );
  const ovulationReminder = useMemo(
    () => getOvulationText(menstruationStart, cycleLength),
    [cycleLength, menstruationStart],
  );

  return (
    <Container>
      <ReminderLabel content={periodReminder} />
      <Separator />
      <ReminderLabel content={ovulationReminder} type="ovulation" />
    </Container>
  );
};
