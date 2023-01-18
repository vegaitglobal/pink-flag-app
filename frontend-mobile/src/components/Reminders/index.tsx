import React from 'react';
import { ReminderLabel } from '../ReminderLabel';
import { Container, Separator } from './styles';

export const Reminders: React.FC = () => {
  return (
    <Container>
      <ReminderLabel content="Period kreće za 2 dana!" />
      <Separator />
      <ReminderLabel content="Ovulacija kreće za 2 dana!" type="ovulation" />
    </Container>
  );
};
