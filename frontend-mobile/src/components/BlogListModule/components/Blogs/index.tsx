import React, { useCallback, useMemo, useState } from 'react';
import { Container, Text } from './styles';
import { useLazyGetAllBlogsQuery } from '@pf/services';
import { BlogSmallModule } from '@pf/components';
import { BlogNavigatorParams, BlogRoutes } from '@pf/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getPageCount } from '@pf/utils';
import { Pagination } from '../Pagination';
import { useNetInfo } from '@react-native-community/netinfo';

const SIZE = 5;
const { BLOG_DETAILS } = BlogRoutes;
type TypedNavigation = NativeStackNavigationProp<BlogNavigatorParams>;

export const Blogs: React.FC = () => {
  const [page, setPage] = useState(0);
  const { isInternetReachable } = useNetInfo();
  const { navigate } = useNavigation<TypedNavigation>();
  const [getPageBlogs, { data, isLoading }] = useLazyGetAllBlogsQuery();
  const totalPages = useMemo(() => getPageCount(SIZE, data?.meta.total_count), [data?.meta.total_count]);

  useFocusEffect(
    useCallback(() => {
      if (isInternetReachable) {
        getPageBlogs({
          category: 'BLOG',
          page: page * SIZE,
          size: SIZE,
        });
      }
    }, [getPageBlogs, isInternetReachable, page]),
  );

  const handleOnPress = useCallback(
    (id?: number) => {
      if (id === undefined) {
        return;
      }
      navigate(BLOG_DETAILS, { id });
    },
    [navigate],
  );

  const Posts = useMemo(() => {
    return data?.items?.map((blog, index) => (
      <BlogSmallModule blog={blog} key={`post_${index}`} onPress={handleOnPress} />
    ));
  }, [data?.items, handleOnPress]);

  if (!data && !isLoading) {
    return (
      <Container>
        <Text content="Trenutno nema blogova." />
      </Container>
    );
  }

  return (
    <Container>
      {Posts}
      <Pagination page={page} totalPages={totalPages} onPress={setPage} />
    </Container>
  );
};
