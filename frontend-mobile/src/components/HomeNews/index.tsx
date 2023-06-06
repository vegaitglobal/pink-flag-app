import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { BlogSmallModule } from '../BlogSmallModule';
import { useNavigation } from '@react-navigation/native';
import { BlogRoutes, BottomTabNavigatorParams, BottomTabRoutes } from '@pf/constants';
import { useGetAllBlogsQuery } from '@pf/services';
import { Container, HIT_SLOP, NewsText, PostsContainer, Row, ViewAllText } from './styles';
import { useTheme } from '@emotion/react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { BLOG_STACK } = BottomTabRoutes;
const { BLOG, BLOG_DETAILS } = BlogRoutes;

export const HomeNews: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useNavigation<NativeStackNavigationProp<BottomTabNavigatorParams>>();
  const { data, isLoading } = useGetAllBlogsQuery({ page: 0, size: 3 });
  const handleOnViewAllPress = useCallback(() => {
    navigate(BLOG_STACK, { screen: BLOG });
  }, [navigate]);

  const onPress = useCallback(
    (id?: number) => {
      if (id === undefined) {
        return;
      }
      navigate(BLOG_STACK, { screen: BLOG_DETAILS, params: { id }, initial: false });
    },
    [navigate],
  );

  const Pots = useMemo(() => {
    return data?.items?.map((blog, index) => <BlogSmallModule blog={blog} key={`post_${index}`} onPress={onPress} />);
  }, [data?.items, onPress]);

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator color={theme.colors.primary} />
      </Container>
    );
  }

  if (!data?.items?.length) {
    return null;
  }

  return (
    <Container>
      <Row>
        <NewsText content="Najnovije objave:" />
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleOnViewAllPress}>
          <ViewAllText content="Pogledaj sve" />
        </TouchableOpacity>
      </Row>
      <PostsContainer>{Pots}</PostsContainer>
    </Container>
  );
};
