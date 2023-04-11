import React from 'react';
import { BadgeText, Container } from './styles';

interface Props {
  content?: string;
}

export const Badge: React.FC<Props> = ({ content }) => {
  return (
    <Container>
      <BadgeText content={content} />
    </Container>
  );
};
