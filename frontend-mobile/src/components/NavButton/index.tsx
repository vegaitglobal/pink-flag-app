import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Container, TextWrapper, StyledCustomText, StyledLine } from './styles';

interface Props {
  icon?: React.ReactElement;
  content?: string;
  onPress?: () => void;
  isFocused?: boolean;
}

export const NavButton: React.FC<Props> = ({ icon, content, isFocused = false, onPress }) => {
  const [lineWidth, setLineWidth] = useState(0);

  const handleOnTextLayout = (event: LayoutChangeEvent): void => {
    setLineWidth(event.nativeEvent.layout.width);
  };

  return (
    <Container onPress={onPress}>
      {icon}
      <TextWrapper>
        <StyledCustomText content={content} onLayout={handleOnTextLayout} isFocused={isFocused} />
      </TextWrapper>
      <StyledLine width={lineWidth} isFocused={isFocused} />
    </Container>
  );
};
