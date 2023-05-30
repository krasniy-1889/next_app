import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as postReducer } from '@/store/posts/posts.slice';
import { api } from '@/store/api/api';
import { createWrapper } from 'next-redux-wrapper';

const reduces = combineReducers({
  posts: postReducer,
  [api.reducerPath]: api.reducer,
});

const initialStore = [];

export function makeStore() {
  return configureStore({
    reducer: reduces,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });
}

export const store = makeStore();
export type RooState = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<RooState>(makeStore);
