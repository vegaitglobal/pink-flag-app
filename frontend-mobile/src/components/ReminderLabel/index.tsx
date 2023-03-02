import React, { useMemo } from 'react';
import { Container, StyledCustomText } from './styles';
import { ReminderType } from './types';
import { getBackground } from './getBackground';

const TEXT_LINES = 2;

interface Props {
  content?: string;
  type?: ReminderType;
}

export const ReminderLabel: React.FC<Props> = ({ content, type = 'period' }) => {
  const background = useMemo(() => getBackground(type), [type]);

  return (
    <Container source={background}>
      <StyledCustomText content={content} type={type} numberOfLines={TEXT_LINES} />
    </Container>
  );
};
