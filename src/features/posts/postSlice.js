import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts, likePost } from "./postAPI";

const getAuth = JSON.parse(localStorage.getItem("token")) || null;
console.log({ getAuth });
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await getPosts(getAuth);
    console.log({ response });
    return response?.data;
  }
);

export const getPostById = (postId) => {
  const postLike = createAsyncThunk("posts/like", async () => {
    const response = await likePost(getAuth, postId);
    console.log({ response });
    return response;
  });
  return postLike;
};
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likeButtonClicked: (state, action) => {
      console.log(action);
      const findPost = state?.posts?.allPosts?.findIndex(
        (post) => post._id === action.payload.postId
      );
      console.log(findPost);
      const userInLikes = state.posts.allPosts[findPost].likes.includes(
        action.payload.userId
      );
      console.log({ userInLikes });
      if (userInLikes) {
        console.log("if");
        state.posts.allPosts[findPost].likes.splice(action.payload.userId, 1);
      } else {
        console.log("else");
        state.posts.allPosts[findPost].likes.push(action.payload.userId);
      }
    },
  },
  extraReducers: {
    [fetchAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "fulfilled";
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [getPostById().pending]: (state) => {
      state.status = "loading";
    },
    [getPostById().fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "fulfilled";
    },
    [getPostById().rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { likeButtonClicked } = postSlice.actions;
export default postSlice.reducer;
