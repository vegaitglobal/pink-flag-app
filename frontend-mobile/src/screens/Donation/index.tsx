import { useTheme } from '@emotion/react';
import { ShareSvg } from '@pf/assets';
import { Footer } from '@pf/components';
import { EMPTY_STRING, WIDTH } from '@pf/constants';
import { BASE_URI, useGetDonationsPageQuery } from '@pf/services';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { Container, Content, HIT_SLOP, Image, LoadingContainer, ShareButton, ShareText, styles, Title } from './styles';

const PADDING = 40;
const CONTENT_WIDTH = WIDTH - PADDING;

export const DonationScreen: React.FC = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetDonationsPageQuery();
  const uri = data?.image?.meta?.download_url;
  const imageSource = useMemo(() => ({ uri: `${BASE_URI}${uri || EMPTY_STRING}` }), [uri]);
  const content = useMemo(() => ({ html: data?.body || EMPTY_STRING }), [data?.body]);

  const handleOnShare = useCallback(() => {
    console.log('Share');
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <Container showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
      <Content missingData={!!data}>
        <Title content={data?.title} />
        {uri && <Image source={imageSource} />}
        <RenderHTML contentWidth={CONTENT_WIDTH} source={content} />
        {data && (
          <ShareButton hitSlop={HIT_SLOP} onPress={handleOnShare}>
            <ShareSvg />
            <ShareText content="Podeli sa prijateljima" />
          </ShareButton>
        )}
      </Content>
      <Footer />
    </Container>
  );
};
