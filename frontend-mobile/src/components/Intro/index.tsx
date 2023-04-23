/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from 'react';
import { AboutUsImage, Container, Content, Description, ImageContainer, Title, getHtmlStyle } from './styles';
import { BASE_URI, useGetAboutUsQuery } from '@pf/services';
import { FALLBACK } from './fallback';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';
import { EMPTY_STRING, WIDTH } from '@pf/constants';
import RenderHTML from 'react-native-render-html';

const PADDING = 40;
const CONTENT_WIDTH = WIDTH - PADDING;

export const Intro: React.FC = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAboutUsQuery();
  const imageSource = useMemo(
    () => ({ uri: `${BASE_URI}${data?.image?.meta.download_url || EMPTY_STRING}` }),
    [data?.image?.meta.download_url],
  );
  const htmlStyle = useMemo(() => getHtmlStyle(theme), [theme]);
  const content = useMemo(
    () => ({
      html: `<span style='${htmlStyle}'>${data?.body || EMPTY_STRING}</span>`,
    }),
    [data?.body, htmlStyle],
  );

  if (isLoading) {
    return (
      <Container source={require('../../assets/images/intro-background.png')} resizeMode="stretch">
        <ActivityIndicator color={theme.colors.white} />
      </Container>
    );
  }

  return (
    <Container source={require('../../assets/images/intro-background.png')} resizeMode="stretch">
      <Content>
        <Title content={data?.title || FALLBACK.title} />
        {data?.body && <RenderHTML contentWidth={CONTENT_WIDTH} source={content} />}
        {!isLoading && !data?.body && <Description content={FALLBACK.description} />}
        {data?.image?.meta.download_url && (
          <ImageContainer>
            <AboutUsImage url={imageSource} />
          </ImageContainer>
        )}
      </Content>
    </Container>
  );
};
