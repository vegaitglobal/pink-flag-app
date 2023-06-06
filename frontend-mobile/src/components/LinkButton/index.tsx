import React, { useCallback } from 'react';
import { Linking, TouchableOpacityProps } from 'react-native';
import { Container } from './styles';

interface Props extends TouchableOpacityProps {
  url?: string;
}

export const LinkButton: React.FC<Props> = ({ url, children, ...props }) => {
  const handleOnPress = useCallback((): void => {
    if (!url) {
      return;
    }

    try {
      Linking.openURL(url);
    } catch {
      /** Do nothing */
    }
  }, [url]);

  if (!url) {
    return null;
  }

  return (
    <Container onPress={handleOnPress} {...props}>
      {children}
    </Container>
  );
};
