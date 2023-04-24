import { Badge, DonateBanner, Footer } from '@pf/components';
import { BlogNavigatorScreenProps, BlogRoutes, EMPTY_STRING, WIDTH } from '@pf/constants';
import { BASE_URI } from '@pf/services';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { RecentPosts } from './components';
import { Container, Content, ContentImage, DateText, Image, LoadingContainer, StyledLine, Title } from './styles';
import { useData } from './useData';

const PADDING = 40;
const CONTENT_WIDTH = WIDTH - PADDING;

const { BLOG_DETAILS } = BlogRoutes;
type Props = BlogNavigatorScreenProps<typeof BLOG_DETAILS>;

export const BlogDetailsScreen: React.FC<Props> = ({ route }) => {
  const { data, date, category, theme, imageUri, isLoading, listStyle, paragraphStyle } = useData(route.params?.id);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <Container showsVerticalScrollIndicator={false} contentContainerStyle={listStyle}>
      <Content missingData={!!data}>
        {data?.category && <Badge content={category} />}
        {date && <DateText content={date} />}
        {data?.title && <Title content={data?.title} />}
        {data?.image?.meta?.download_url && <Image url={imageUri} />}
        {data?.body.map((element, index) => {
          if (element.type === 'paragraph') {
            return (
              <RenderHTML
                key={`paragraph_${index}`}
                baseStyle={paragraphStyle}
                contentWidth={CONTENT_WIDTH}
                source={{ html: element.value }}
              />
            );
          }

          if (element.type === 'image') {
            return <ContentImage key={`image_${index}`} url={{ uri: `${BASE_URI}${element.value || EMPTY_STRING}` }} />;
          }
        })}
        <StyledLine />
        <RecentPosts />
        <DonateBanner />
      </Content>
      <Footer />
    </Container>
  );
};
