import React, { useCallback, useMemo } from 'react';
import { Container, Content, DateText, Image, styles, Title } from './styles';
import { BlogModel } from '@pf/models';
import { getPostDate } from '@pf/utils';
import { BASE_URI } from '@pf/services';
import { EMPTY_STRING } from '@pf/constants';

const TEXT_LINES = 3;

export interface BlogSmallModuleProps {
  blog: BlogModel;
  onPress?: (id?: number) => void;
}

export const BlogSmallModule: React.FC<BlogSmallModuleProps> = ({ blog, onPress }) => {
  const date = useMemo(() => getPostDate(blog?.meta?.first_published_at), [blog?.meta?.first_published_at]);
  const imageSource = useMemo(
    () => ({ uri: `${BASE_URI}${blog?.image?.meta?.download_url || EMPTY_STRING}` }),
    [blog?.image?.meta.download_url],
  );
  const handleOnPress = useCallback(() => {
    onPress?.(blog?.id);
  }, [blog?.id, onPress]);

  if (!blog) {
    return null;
  }

  return (
    <Container style={styles.shadow} onPress={handleOnPress}>
      <Image source={imageSource} resizeMode="cover" />
      <Content>
        <Title content={blog?.title} numberOfLines={TEXT_LINES} />
        <DateText content={date} />
      </Content>
    </Container>
  );
};
