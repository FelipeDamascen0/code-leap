import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userReducer';
import postReducer from './redux/post';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;