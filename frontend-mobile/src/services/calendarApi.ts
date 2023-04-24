import { CalendarBanner } from '@pf/models';
import { rootApi } from './rootApi';

type Response<T> = {
  items: T[];
};

export const calendarApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCalendarBanner: builder.query<CalendarBanner, void>({
      query: () => `pages/?type=blog.CalendarModule&fields=*`,
      transformResponse: (response: Response<CalendarBanner>) => response.items[0],
    }),
  }),
});

export const { useGetCalendarBannerQuery } = calendarApi;
