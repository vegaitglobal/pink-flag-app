import { BlogModel, BlogDetailsModel, PageableModel } from '@pf/models';
import { rootApi } from './rootApi';
import { EMPTY_STRING } from '@pf/constants';

export const blogApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getAllBlogs: builder.query<PageableModel<BlogModel>, { page?: number; size?: number; category?: string }>({
      query: ({ page, size, category }) => ({
        url: `pages?type=blog.BlogPage&fields=*&order=-first_published_at&format=json`,
        params: {
          offset: page,
          limit: size,
          category,
        },
      }),
    }),
    getFeaturedBlog: builder.query<PageableModel<BlogModel>, void>({
      query: () => `pages?type=blog.BlogPage&featured=true&fields=*&order=-first_published_at&format=json`,
    }),
    getBlogById: builder.query<BlogDetailsModel, number | undefined>({
      query: id => `pages/${id || EMPTY_STRING}?fields=*&format=json`,
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetFeaturedBlogQuery, useGetBlogByIdQuery } = blogApi;
