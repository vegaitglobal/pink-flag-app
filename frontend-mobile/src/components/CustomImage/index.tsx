import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, ImageResizeMode, ImageSourcePropType } from 'react-native';
import { Container, Loader, styles } from './styles';
import { useTheme } from '@emotion/react';

const MAX_RETRIES = 3;

interface Props {
  url?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  onError?: () => void;
}

export const CustomImage: React.FC<Props> = ({ url, resizeMode = 'stretch', onError, ...props }) => {
  const theme = useTheme();
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleOnError = useCallback(() => {
    const canRetry = retryAttempts < MAX_RETRIES;
    if (canRetry) {
      setRetryAttempts(prevState => prevState + 1);
      return;
    }

    onError?.();
  }, [onError, retryAttempts]);

  const handleOnLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleOnLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Container {...props}>
      {url && (
        <Image
          source={url}
          resizeMode={resizeMode}
          onError={handleOnError}
          onLoadEnd={handleOnLoadEnd}
          onLoadStart={handleOnLoadStart}
          style={styles.image}
        />
      )}
      {isLoading && (
        <Loader>
          <ActivityIndicator color={theme.colors.primary} />
        </Loader>
      )}
    </Container>
  );
};
