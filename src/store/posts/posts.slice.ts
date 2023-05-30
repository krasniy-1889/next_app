import { IPost } from '@/types/posts/post.type';
import { createSlice } from '@reduxjs/toolkit';
import { useGetPostsQuery } from '../api/posts.api';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [] as IPost[],
  },
  reducers: {
    getPosts: (state, payolaod) => {
      const { data, isLoading, error } = useGetPostsQuery();
      state.posts = data;
    },
  },
});

export const { actions, reducer } = postsSlice;
