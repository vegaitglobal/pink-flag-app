/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EMPTY_STRING } from '@pf/constants';
import { BASE_URI, useGetBlogByIdQuery } from '@pf/services';
import { getPostDate } from '@pf/utils';
import { useMemo } from 'react';
import { styles } from './styles';

export const useData = (id?: number) => {
  const { data, isLoading } = useGetBlogByIdQuery(id, { skip: id === undefined });
  const date = useMemo(() => getPostDate(data?.meta?.first_published_at), [data?.meta?.first_published_at]);
  const listStyle = useMemo(() => (data ? undefined : styles.list), [data]);
  const imageUri = useMemo(
    () => ({ uri: BASE_URI + (data?.image?.meta?.download_url ?? EMPTY_STRING) }),
    [data?.image?.meta?.download_url],
  );
  const category = useMemo(() => (data?.category === 'VESTI' ? 'Vest' : 'Blog'), [data?.category]);

  return {
    data,
    isLoading,
    date,
    listStyle,
    imageUri,
    category,
  };
};
