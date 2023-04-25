import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../actions/userReducer';
import postReducer from '../actions/post';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;