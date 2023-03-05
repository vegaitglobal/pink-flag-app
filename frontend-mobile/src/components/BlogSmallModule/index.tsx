import React, { useCallback, useMemo } from 'react';
import { Container, Content, DateText, Image, styles, Title } from './styles';
import { BlogModel } from '@pf/models';
import { getPostDate } from '@pf/utils';

const TEXT_LINES = 3;

export interface BlogSmallModuleProps {
  blog: BlogModel;
  onPress?: (id?: number) => void;
}

export const BlogSmallModule: React.FC<BlogSmallModuleProps> = ({ blog, onPress }) => {
  const date = useMemo(() => getPostDate(blog?.meta?.first_published_at), [blog?.meta?.first_published_at]);
  const source = useMemo(
    () => ({
      uri: blog?.image?.meta?.detail_url,
    }),
    [blog?.image?.meta?.detail_url],
  );
  const handleOnPress = useCallback(() => {
    onPress?.(blog?.id);
  }, [blog?.id, onPress]);

  if (!blog) {
    return null;
  }

  return (
    <Container style={styles.shadow} onPress={handleOnPress}>
      <Image source={source} resizeMode="cover" />
      <Content>
        <Title content={blog?.title} numberOfLines={TEXT_LINES} />
        <DateText content={date} />
      </Content>
    </Container>
  );
};
