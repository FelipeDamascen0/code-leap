import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  content: string;
  minutes: string;
  hours: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;

export const deletePostRequest = (id: number) => {
  return {
    type: 'posts/deletePost',
    payload: id,
  };
};

export const editPostRequest = (id: Post) => {
  return {
    type: 'posts/editPost',
    payload: id,
  };
};


export default postsSlice.reducer;