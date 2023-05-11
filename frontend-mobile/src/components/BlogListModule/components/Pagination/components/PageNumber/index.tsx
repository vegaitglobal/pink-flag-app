import React, { useCallback, useMemo } from 'react';
import { Container, Number } from './styles';

interface Props {
  isSelected?: boolean;
  content?: number | string;
  onPress?: (index: number) => void;
}

export const PageNumber: React.FC<Props> = ({ isSelected, content, onPress }) => {
  const isDisabled = typeof content !== 'number';
  const displayValue = useMemo(() => (typeof content === 'number' ? `${content + 1}` : content), [content]);
  const handleOnPress = useCallback(() => {
    if (content === undefined || typeof content !== 'number') {
      return;
    }

    onPress?.(content);
  }, [content, onPress]);

  if (content === undefined) {
    return null;
  }

  return (
    <Container isSelected={isSelected} onPress={handleOnPress} disabled={isDisabled}>
      <Number content={displayValue} isSelected={isSelected} />
    </Container>
  );
};
