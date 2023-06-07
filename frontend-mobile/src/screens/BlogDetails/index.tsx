import { Badge, DonateBanner, Footer, NoConnectionOverlay } from '@pf/components';
import { BlogNavigatorScreenProps, BlogRoutes } from '@pf/constants';
import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { BlogImage, Paragraph, RecentPosts } from './components';
import { Author, Container, Content, DateText, Image, LoadingContainer, StyledLine, Title } from './styles';
import { useData } from './useData';
import { useTheme } from '@emotion/react';

const { BLOG_DETAILS } = BlogRoutes;
type Props = BlogNavigatorScreenProps<typeof BLOG_DETAILS>;

export const BlogDetailsScreen: React.FC<Props> = ({ route }) => {
  const theme = useTheme();
  const { data, date, category, imageUri, isLoading, listStyle } = useData(route.params?.id);

  const content = useMemo(
    () =>
      data?.body.map((element, index) => {
        if (element.type === 'paragraph') {
          return <Paragraph key={`paragraph_${index}`} content={element.value as string} />;
        }

        if (element.type === 'image') {
          return <BlogImage key={`image_${index}`} imageId={element.value as number} />;
        }
      }),
    [data?.body],
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container showsVerticalScrollIndicator={false} contentContainerStyle={listStyle}>
        <Content missingData={!!data}>
          {data?.category && <Badge content={category} />}
          {date && <DateText content={date} />}
          {data?.author && <Author content={`Autor: ${data?.author}`} />}
          {data?.title && <Title content={data?.title} />}
          {data?.image?.meta?.download_url && <Image url={imageUri} />}
          {content}
          <StyledLine />
          <RecentPosts currentBlogId={data?.id} category={data?.category || 'BLOG'} />
          <DonateBanner />
        </Content>
        <Footer />
      </Container>
      <NoConnectionOverlay />
    </>
  );
};
