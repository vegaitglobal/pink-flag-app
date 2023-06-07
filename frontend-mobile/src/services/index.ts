export { rootApi, BASE_URI } from './rootApi';

//! Data hooks
export {
  usersApi,
  useLazyGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './userApi';
export {
  useGetAllBlogsQuery,
  useLazyGetAllBlogsQuery,
  useGetFeaturedBlogQuery,
  useGetBlogByIdQuery,
  useGetBlogImageQuery,
  useGetRecentBlogsQuery,
} from './blogApi';
export { useGetFooterQuery } from './footerApi';
export * from './donationsApi';
export { useGetInstagramFeedQuery } from './instagram';
export { useGetAboutUsQuery } from './homeApi';
export * from './calendarApi';
