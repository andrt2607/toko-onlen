import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {authApi} from "@/services/auth";

export const store = configureStore({
  //fungsi nya untuk mendefinisikan letak reducer
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  //fungsinya untuk menggabungkan middleware redux dengan middleware custom kita
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware]),
}) 

//untuk menghubungkan middleware redux toolkit dan store redux
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch