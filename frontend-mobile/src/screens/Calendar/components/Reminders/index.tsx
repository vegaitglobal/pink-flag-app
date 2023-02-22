import React, { useMemo } from 'react';
import { ReminderLabel } from '@pf/components';
import { Container, Separator } from './styles';
import { getDateWithOffset } from '../../utils';
import { TODAY } from '@pf/constants';
import { getOvulationText, getPeriodText } from './utils';
import { useNotificationSchedule } from './hooks';

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
  const periodReminder = useMemo(
    () => getPeriodText(menstruationStart, menstruationLength, cycleLength),
    [cycleLength, menstruationLength, menstruationStart],
  );
  const ovulationReminder = useMemo(
    () => getOvulationText(menstruationStart, cycleLength),
    [cycleLength, menstruationStart],
  );

  useNotificationSchedule(menstruationStart, cycleLength);

  return (
    <Container>
      <ReminderLabel content={periodReminder} />
      <Separator />
      <ReminderLabel content={ovulationReminder} type="ovulation" />
    </Container>
  );
};
