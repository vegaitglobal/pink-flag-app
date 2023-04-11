import { BlogSmallModule } from '@pf/components';
import { BlogNavigatorParams, BlogRoutes } from '@pf/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { Container, Title } from './styles';

const { BLOG_DETAILS } = BlogRoutes;
type TypedNavigation = NativeStackNavigationProp<BlogNavigatorParams>;

export const RecentPosts: React.FC = () => {
  const { navigate } = useNavigation<TypedNavigation>();
  const data = { items: [{}, {}] }; // ! Configure data here.

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
    return data?.items?.map((blog, index) => <BlogSmallModule blog={blog} key={`post_${index}`} onPress={onPress} />);
  }, [data?.items, onPress]);

  return (
    <Container>
      <Title content="Prethodne objave:" />
      {Posts}
    </Container>
  );
};
