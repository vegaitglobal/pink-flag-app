import React from 'react';
import { ModalHeader as Header } from '@pf/components';
import { Container, Title } from './styles';
import { Content } from './components';

export const CalendarSettingsScreen: React.FC = () => {
  return (
    <Container>
      <Header />
      <Title content="Podešavanja" />
      <Content />
    </Container>
  );
};
