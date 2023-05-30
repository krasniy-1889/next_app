import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper'

const apiUrl: string = 'http://127.0.0.1:8000';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['post'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getRoot: builder.query({
      query: () => '/',
    }),
  }),
});

export const { useGetRootQuery } = api;
