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
  const date = useMemo(() => getPostDate(data?.meta?.first_published_at), [data?.meta?.first_published_at]);
  const imageUrl = useMemo(
    () => ({ uri: `${BASE_URI}${data?.image?.meta?.download_url || EMPTY_STRING}` }),
    [data?.image?.meta?.download_url],
  );
  const category = useMemo(() => (data?.category === 'VESTI' ? 'Vest' : 'Blog'), [data?.category]);

  const handleOnPress = useCallback(() => {
    const blogId = data?.id;
    if (blogId === undefined) {
      return;
    }
    navigate(BLOG_DETAILS, { id: blogId });
  }, [data?.id, navigate]);

  if (isLoading) {
    return <ActivityIndicator color={theme.colors.primary} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Animated.View entering={SlideInUp}>
      <Container style={styles.shadow} onPress={handleOnPress}>
        <Image source={imageUrl} />
        <Content>
          <Badge content={category} />
          <DateText content={date} />
          <Title content={data?.title} numberOfLines={TEXT_LINES} />
        </Content>
      </Container>
    </Animated.View>
  );
};
