import { BlogSmallModule } from '@pf/components';
import { BlogNavigatorParams, BlogRoutes } from '@pf/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { Container, Loader, Title } from './styles';
import { useGetRecentBlogsQuery } from '@pf/services';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';

const SIZE = 4;
const { BLOG_DETAILS } = BlogRoutes;
type TypedNavigation = NativeStackNavigationProp<BlogNavigatorParams>;

interface Props {
  currentBlogId?: number;
  category: 'VESTI' | 'BLOG';
}

export const RecentPosts: React.FC<Props> = ({ category, currentBlogId }) => {
  const theme = useTheme();
  const { navigate } = useNavigation<TypedNavigation>();
  const { data, isLoading } = useGetRecentBlogsQuery({ category, currentBlogId, size: SIZE });
  const onPress = useCallback(
    (id?: number) => {
      if (id === undefined) {
        return;
      }
      navigate(BLOG_DETAILS, { id });
    },
    [navigate],
  );

  const Posts = useMemo(() => {
    return data?.map((blog, index) => <BlogSmallModule blog={blog} key={`post_${index}`} onPress={onPress} />);
  }, [data, onPress]);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={theme.colors.primary} />
      </Loader>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Container>
      <Title content="Prethodne objave:" />
      {Posts}
    </Container>
  );
};
