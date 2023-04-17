/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useEffect, useMemo } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import { Container, Image } from './styles';
import { useLazyGetInstagramFeedQuery } from '@pf/services';

export const FeedImages: React.FC = () => {
  const [getFeedImages, { data }] = useLazyGetInstagramFeedQuery();

  const handleOnPress = useCallback(() => {
    if (Config.INSTAGRAM_URL) {
      Linking.openURL(Config.INSTAGRAM_URL);
    }
  }, []);

  useEffect(() => {
    getFeedImages();
  }, [getFeedImages]);

  const Images = useMemo(() => {
    return data?.map((image, index) => {
      if ([2, 5, 8].includes(index)) {
        return (
          <TouchableOpacity onPress={handleOnPress} key={index}>
            <Image source={{ uri: image.thumbnail }} />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity onPress={handleOnPress} key={index}>
          <Image source={{ uri: image.thumbnail }} hasSpacing />
        </TouchableOpacity>
      );
    });
  }, [handleOnPress, data]);

  if (!data) {
    return null;
  }

  return <Container>{Images}</Container>;
};
