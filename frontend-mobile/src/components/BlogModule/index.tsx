import { useTheme } from '@emotion/react';
import { BlogNavigatorParams, BlogRoutes, EMPTY_STRING } from '@pf/constants';
import { BASE_URI, useGetFeaturedBlogQuery } from '@pf/services';
import { getPostDate } from '@pf/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { Badge } from '../Badge';
import { Container, Content, DateText, Image, styles, Title } from './styles';

const TEXT_LINES = 2;
const { BLOG_DETAILS } = BlogRoutes;
type TypedNavigation = NativeStackNavigationProp<BlogNavigatorParams>;

export const BlogModule: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useNavigation<TypedNavigation>();
  const { data, isLoading } = useGetFeaturedBlogQuery();
  const blog = useMemo(() => data?.items?.[0], [data?.items]);
  const date = useMemo(() => getPostDate(blog?.meta?.first_published_at), [blog?.meta?.first_published_at]);
  const imageUrl = useMemo(
    () => ({ uri: `${BASE_URI} + ${blog?.image?.meta?.download_url || EMPTY_STRING}` }),
    [blog?.image?.meta?.download_url],
  );

  const handleOnPress = useCallback(() => {
    const blogId = blog?.id;
    if (blogId === undefined) {
      return;
    }
    navigate(BLOG_DETAILS, { id: blogId });
  }, [blog?.id, navigate]);

  if (isLoading) {
    return <ActivityIndicator color={theme.colors.primary} />;
  }

  if (!data?.meta.total_count) {
    return null;
  }

  return (
    <Animated.View entering={SlideInUp}>
      <Container style={styles.shadow} onPress={handleOnPress}>
        <Image source={imageUrl} />
        <Content>
          <Badge content={blog?.meta.type} />
          <DateText content={date} />
          <Title content={blog?.title} numberOfLines={TEXT_LINES} />
        </Content>
      </Container>
    </Animated.View>
  );
};
