import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts, likePost } from "./postAPI";

const getAuth = JSON.parse(localStorage.getItem("token")) || null;
console.log({ getAuth });
export const getAuthForFetchPosts = (auth) => {
  const fetchAllPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
    const response = await getPosts(auth);
    console.log({ response });
    return response?.data;
  });
  return fetchAllPosts;
};

export const getPostById = (postId) => {
  console.log("A", postId);
  const postLike = createAsyncThunk("posts/like", async () => {
    const response = await likePost(getAuth, postId);
    console.log({ response });
    return response.data;
  });
  return postLike;
};
const initialState = {
  posts: [],
  status: "idle",
  error: null,
  like: [],
  likeStatus: "idle",
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
    [getAuthForFetchPosts().pending]: (state) => {
      state.status = "loading";
    },
    [getAuthForFetchPosts().fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "fulfilled";
    },
    [getAuthForFetchPosts().rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [getPostById().pending]: (state) => {
      state.likeStatus = "loading";
    },
    [getPostById().fulfilled]: (state, action) => {
      state.like = action.payload;
      state.likeStatus = "fulfilled";
    },
    [getPostById().rejected]: (state, action) => {
      state.likeStatus = "error";
      state.error = action.error.message;
    },
  },
});

export const { likeButtonClicked } = postSlice.actions;
export default postSlice.reducer;
