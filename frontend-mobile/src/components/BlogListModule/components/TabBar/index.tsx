import React from 'react';
import { Container } from './styles';
import { TabButton } from '../TabButton';

interface Props {
  activeIndex: number;
  onPress?: (index: number) => void;
}

export const TabBar: React.FC<Props> = ({ activeIndex, onPress }) => {
  return (
    <Container>
      <TabButton content={'Blog'} index={0} isFocused={activeIndex === 0} onPress={onPress} />
      <TabButton content={'Vesti'} index={1} isFocused={activeIndex === 1} onPress={onPress} />
    </Container>
  );
};
