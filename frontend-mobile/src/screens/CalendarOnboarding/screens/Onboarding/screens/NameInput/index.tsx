import { CustomInput, WithSafeView } from '@pf/components';
import { dismissKeyboard } from '@pf/utils';
import React, { useCallback } from 'react';
import { SvgBackground } from '../../components';
import { Container, StyledTitle } from './styles';
import { EMPTY_STRING } from '@pf/constants';

interface Props {
  initialValue?: string;
  onInputChange: (isValid: boolean, value: string) => void;
}

export const NameInputScreen: React.FC<Props> = WithSafeView(({ initialValue, onInputChange }) => {
  const handleOnChangeText = useCallback(
    (text: string) => {
      onInputChange(text.length > 0, text);
    },
    [onInputChange],
  );

  return (
    <Container onPress={dismissKeyboard}>
      <SvgBackground />
      <StyledTitle content="Kako se zoveš?" />
      <CustomInput
        placeholder="Tvoje ime"
        onChangeText={handleOnChangeText}
        defaultValue={initialValue || EMPTY_STRING}
      />
    </Container>
  );
});
