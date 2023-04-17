/* eslint-disable @typescript-eslint/no-floating-promises */
import { EMPTY_STRING } from '@pf/constants';
import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import Config from 'react-native-config';
import { FeedImages } from '../FeedImages';
import { Container, StyledPrimaryButton, Title } from './styles';

export const InstagramFeed: React.FC = () => {
  const userName = Config.INSTAGRAM_USERNAME ? '@' + Config.INSTAGRAM_USERNAME : EMPTY_STRING;

  const handleOnButtonPress = useCallback(() => {
    if (Config.INSTAGRAM_URL) {
      Linking.openURL(Config.INSTAGRAM_URL);
    }
  }, []);

  return (
    <Container>
      <Title content="Instagram feed" />
      <FeedImages />
      <StyledPrimaryButton isFullWidth={false} onPress={handleOnButtonPress} content={`Zaprati nas na ${userName}`} />
    </Container>
  );
};
