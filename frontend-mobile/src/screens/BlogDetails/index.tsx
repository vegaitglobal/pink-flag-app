import { useTheme } from '@emotion/react';
import { Badge, DonateBanner, Footer } from '@pf/components';
import { BlogRoutes, EMPTY_STRING, WIDTH } from '@pf/constants';
import { BASE_URI, useGetBlogByIdQuery } from '@pf/services';
import { getPostDate } from '@pf/utils';
import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { HomeScreenProps } from 'src/navigation/HomeNavigator';
import { RecentPosts } from './components';
import { Container, Content, DateText, Image, LoadingContainer, StyledLine, styles, Title } from './styles';

const PADDING = 40;
const CONTENT_WIDTH = WIDTH - PADDING;

const { BLOG_DETAILS } = BlogRoutes;

export const BlogDetailsScreen: React.FC<HomeScreenProps<typeof BLOG_DETAILS>> = ({ route }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetBlogByIdQuery(route?.params?.id);
  const date = useMemo(() => getPostDate(data?.meta?.first_published_at), [data?.meta?.first_published_at]);
  const hasData = !!data;
  const listStyle = hasData ? undefined : styles.list;
  const imageUri = useMemo(
    () => ({ uri: BASE_URI + (data?.image?.meta?.download_url ?? EMPTY_STRING) }),
    [data?.image?.meta?.download_url],
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <Container showsVerticalScrollIndicator={false} contentContainerStyle={listStyle}>
      <Content missingData={hasData}>
        {data?.meta?.type && <Badge content={data?.meta?.type} />}
        {date && <DateText content={date} />}
        {data?.title && <Title content={data?.title} />}
        {data?.image?.meta?.download_url && <Image source={imageUri} />}
        <RenderHTML contentWidth={CONTENT_WIDTH} source={{ html: `<div/>` }} />
        <StyledLine />
        <RecentPosts />
        <DonateBanner />
      </Content>
      <Footer />
    </Container>
  );
};

//     {data.body.map((bodyItem, index) => {
//       if (bodyItem.type == 'paragraph') {
//         return (
//           <RenderHtml
//             key={index}
//             baseStyle={{ color: 'black' }}
//             contentWidth={width}
//             source={{ html: bodyItem.value }}
//           />
//         );
//       }
//       if (bodyItem.type == 'image' && bodyItem.value && bodyItem.value.length > 10) {
//         return (
//           <Image
//             key={index}
//             style={styles.cardImage}
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//             source={{ uri: BASE_URI + String(bodyItem.value) }}
//           />
//         );
//       }
//       return null;
//     })}
//   </View>
// )}
