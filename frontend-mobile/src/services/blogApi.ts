import { BlogModel, BlogDetailsModel, PageableModel, Response, BlogType } from '@pf/models';
import { rootApi } from './rootApi';
import { EMPTY_STRING } from '@pf/constants';

interface BlogImage {
  meta: {
    download_url: string;
  };
}

interface BlogParams {
  page?: number;
  size?: number;
  category?: BlogType;
}

interface RecentBlogParams extends BlogParams {
  currentBlogId?: number;
}

export const blogApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getAllBlogs: builder.query<PageableModel<BlogModel>, BlogParams>({
      query: ({ page, size, category }) => ({
        url: `pages?type=blog.BlogPage&fields=*&order=-first_published_at&format=json`,
        params: {
          offset: page,
          limit: size,
          category,
        },
      }),
    }),
    getFeaturedBlog: builder.query<BlogModel, void>({
      query: () => `pages?type=blog.BlogPage&featured=true&fields=*&order=-first_published_at&format=json`,
      transformResponse: (response: Response<BlogModel>) => response.items[0],
    }),
    getBlogById: builder.query<BlogDetailsModel, number | undefined>({
      query: id => `pages/${id || EMPTY_STRING}?fields=*&format=json`,
    }),

    getBlogImage: builder.query<BlogImage, number>({
      query: imageId => `images/${imageId}?fields=*&format=json`,
    }),

    getRecentBlogs: builder.query<BlogModel[], RecentBlogParams>({
      query: ({ size, category }) => ({
        url: `pages?type=blog.BlogPage&fields=*&order=random&format=json`,
        params: {
          limit: size,
          category,
        },
      }),
      transformResponse: (response: Response<BlogModel>, _meta, arg): BlogModel[] => {
        const idToSkip = arg.currentBlogId;
        if (idToSkip !== undefined) {
          return response.items.filter(x => x.id !== idToSkip);
        }
        return response.items;
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetFeaturedBlogQuery,
  useGetBlogByIdQuery,
  useGetBlogImageQuery,
  useGetRecentBlogsQuery,
} = blogApi;
