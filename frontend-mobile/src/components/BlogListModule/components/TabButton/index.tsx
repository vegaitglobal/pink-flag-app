import React, { useCallback } from 'react';
import { Container, Text } from './styles';

interface Props {
  index: number;
  content?: string;
  isFocused?: boolean;
  onPress?: (index: number) => void;
}

export const TabButton: React.FC<Props> = ({ index, isFocused, content, onPress }) => {
  const handleOnPress = useCallback(() => onPress?.(index), [index, onPress]);

  return (
    <Container onPress={handleOnPress}>
      <Text content={content} isFocused={isFocused} />
    </Container>
  );
};
