import { DonationsModel, DonationsModuleModel } from '@pf/models';
import { rootApi } from './rootApi';

type Response<T> = {
  items: T[];
};

export const donationsApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getDonationsPage: builder.query<DonationsModel, void>({
      query: () => `pages/?type=blog.DonationPage&fields=*&format=json`,
      transformResponse: (response: Response<DonationsModel>) => response.items[0],
    }),

    getDonationsModule: builder.query<DonationsModuleModel, void>({
      query: () => `pages/?type=blog.DonationsModule&fields=*&format=json`,
      transformResponse: (response: Response<DonationsModuleModel>) => response.items[0],
    }),
  }),
});

export const { useGetDonationsPageQuery, useGetDonationsModuleQuery } = donationsApi;
