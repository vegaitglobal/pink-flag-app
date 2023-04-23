import { AboutUsModel } from '@pf/models';
import { rootApi } from './rootApi';

type GetAboutUsResponse = {
  items: AboutUsModel[];
};

export const homeApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getAboutUs: builder.query<AboutUsModel, void>({
      query: () => `pages/?type=blog.AboutUsPage&fields=*&format=json`,
      transformResponse: (response: GetAboutUsResponse) => response.items[0],
    }),
  }),
});

export const { useGetAboutUsQuery } = homeApi;
