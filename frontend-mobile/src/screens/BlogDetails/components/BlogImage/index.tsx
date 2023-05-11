import React, { useMemo } from 'react';
import { Container } from './styles';
import { BASE_URI, useGetBlogImageQuery } from '@pf/services';
import { EMPTY_STRING } from '@pf/constants';

interface Props {
  imageId: number;
}

export const BlogImage: React.FC<Props> = ({ imageId }) => {
  const { data } = useGetBlogImageQuery(imageId);
  const imageUrl = useMemo(
    () => ({ uri: `${BASE_URI}${data?.meta.download_url || EMPTY_STRING}` }),
    [data?.meta.download_url],
  );

  return <Container url={imageUrl} />;
};
