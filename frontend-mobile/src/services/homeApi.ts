import { AboutUsModel } from '@pf/models';
import { rootApi } from './rootApi';

type Response<T> = {
  items: T[];
};

export const homeApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getAboutUs: builder.query<AboutUsModel, void>({
      query: () => `pages/?type=blog.AboutUsPage&fields=*&format=json`,
      transformResponse: (response: Response<AboutUsModel>) => response.items[0],
    }),
  }),
});

export const { useGetAboutUsQuery } = homeApi;
