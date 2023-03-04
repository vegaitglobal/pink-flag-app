/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useMemo } from 'react';
import { Linking } from 'react-native';
import Config from 'react-native-config';
import { Container, Image } from './styles';

const url = 'https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg';

export const FeedImages: React.FC = () => {
  const urls = useMemo(() => [url, url, url, url, url, url, url, url, url], []);
  const handleOnPress = useCallback(() => {
    if (Config.INSTAGRAM_URL) {
      Linking.openURL(Config.INSTAGRAM_URL);
    }
  }, []);

  const Images = useMemo(() => {
    return urls.map((image, index) => {
      if ([2, 5, 8].includes(index)) {
        return <Image source={{ uri: image }} key={index} />;
      }

      return <Image source={{ uri: image }} key={index} hasSpacing />;
    });
  }, [urls]);

  return <Container onPress={handleOnPress}>{Images}</Container>;
};
