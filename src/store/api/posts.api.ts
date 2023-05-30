import { api } from '@/store/api/api';

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
  }),
});

export const {
  useGetPostsQuery
} = postsApi
