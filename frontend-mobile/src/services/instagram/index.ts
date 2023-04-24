import { InstagramFeedResponse } from '@pf/models';
import { rootApi } from '../rootApi';
import Config from 'react-native-config';
import { getFeedImages } from './getFeedImages';
import { InstagramFeed } from './types';

const instagramUsername = Config.INSTAGRAM_USERNAME;

export const instagramApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getInstagramFeed: builder.query<InstagramFeed, void>({
      query: () => ({
        url: `https://www.instagram.com/api/v1/users/web_profile_info/?username=${instagramUsername}`,
        headers: {
          'User-Agent': 'Instagram 0.0.0.0.0',
        },
      }),
      transformResponse: (response: InstagramFeedResponse) => getFeedImages(response),
    }),
  }),
});

export const { useGetInstagramFeedQuery } = instagramApi;
