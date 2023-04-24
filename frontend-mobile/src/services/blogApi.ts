import { BlogModel, BlogDetailsModel, PageableModel } from '@pf/models';
import { rootApi } from './rootApi';

export const blogApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getAllBlogs: builder.query<PageableModel<BlogModel>, { page: number; size: number; category: string }>({
      query: ({ page, size, category }) =>
        `pages?type=blog.BlogPage&offset=${page}&limit=${size}&category=${category}&fields=*&order=-first_published_at&format=json`,
    }),
    getFeaturedBlog: builder.query<PageableModel<BlogModel>, void>({
      query: () => `pages?type=blog.BlogPage&featured=true&fields=*&order=-first_published_at&format=json`,
    }),
    getBlogById: builder.query<BlogDetailsModel, number>({
      query: id => `pages/${id}?fields=*&format=json`,
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetFeaturedBlogQuery, useGetBlogByIdQuery } = blogApi;
