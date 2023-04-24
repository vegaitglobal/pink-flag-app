/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useMemo } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import { Container, Image } from './styles';
import { useGetInstagramFeedQuery } from '@pf/services';

export const FeedImages: React.FC = () => {
  const { data, isLoading } = useGetInstagramFeedQuery();

  const handleOnPress = useCallback(() => {
    if (Config.INSTAGRAM_URL) {
      Linking.openURL(Config.INSTAGRAM_URL);
    }
  }, []);

  const Images = useMemo(() => {
    return data?.map((image, index) => {
      if ([2, 5, 8].includes(index)) {
        return (
          <TouchableOpacity onPress={handleOnPress} key={index}>
            <Image url={{ uri: image.thumbnail }} />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity onPress={handleOnPress} key={index}>
          <Image url={{ uri: image.thumbnail }} hasSpacing />
        </TouchableOpacity>
      );
    });
  }, [data, handleOnPress]);

  const LoadingImages = useMemo(() => {
    return [...Array.from({ length: 9 })].map((_, index) => {
      if ([2, 5, 8].includes(index)) {
        return (
          <TouchableOpacity onPress={handleOnPress} key={index}>
            <Image />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity onPress={handleOnPress} key={index}>
          <Image hasSpacing />
        </TouchableOpacity>
      );
    });
  }, [handleOnPress]);

  if (isLoading) {
    return <Container>{LoadingImages}</Container>;
  }

  if (!data) {
    return null;
  }

  return <Container>{Images}</Container>;
};
