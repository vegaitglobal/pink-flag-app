import React, { useCallback, useMemo, useState } from 'react';
import { Container, Text } from './styles';
import { useGetAllBlogsQuery } from '@pf/services';
import { BlogSmallModule } from '@pf/components';
import { BlogNavigatorParams, BlogRoutes } from '@pf/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { getPageCount } from '@pf/utils';
import { Pagination } from '../Pagination';

const SIZE = 5;
const { BLOG_DETAILS } = BlogRoutes;
type TypedNavigation = NativeStackNavigationProp<BlogNavigatorParams>;

export const News: React.FC = () => {
  const [page, setPage] = useState(0);
  const { navigate } = useNavigation<TypedNavigation>();
  const { data, isLoading } = useGetAllBlogsQuery({ category: 'VESTI', page, size: SIZE });
  const totalPages = useMemo(() => getPageCount(SIZE, data?.meta.total_count), [data?.meta.total_count]);

  const handleOnPress = useCallback(
    (id?: number) => {
      if (id === undefined) {
        return;
      }
      navigate(BLOG_DETAILS, { id });
    },
    [navigate],
  );

  const News = useMemo(() => {
    return data?.items.map((blog, index) => (
      <BlogSmallModule blog={blog} key={`news_${index}`} onPress={handleOnPress} />
    ));
  }, [data?.items, handleOnPress]);

  if (!data && !isLoading) {
    return (
      <Container>
        <Text content="Trenutno nema vesti." />
      </Container>
    );
  }

  return (
    <Container>
      {News}
      <Pagination page={page} totalPages={totalPages} onPress={setPage} />
    </Container>
  );
};
