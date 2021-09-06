import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postSlice from "../posts/postSlice";
import { getUser } from "./userAPI";

const getAuth = JSON.parse(localStorage.getItem("token")) || null;
const getId = JSON.parse(localStorage.getItem("_id")) || null;
console.log({ getAuth, getId });
export const getUserIdFromParams = (paramsId) => {
  const fetchUserByUserId = createAsyncThunk(
    "users/fetchUserByUserId",
    async () => {
      const response = await getUser(getAuth, paramsId);
      console.log({ response });
      return response?.data;
    }
  );
  return fetchUserByUserId;
};

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    followButtonClicked: (state, action) => {
      console.log(action);
      const userInFollowing = state?.user?.myFollowing.includes(action.payload);
      console.log({ userInFollowing });
      if (userInFollowing) {
        state?.user?.myFollowing?.splice(action.payload);
      } else {
        state?.user?.myFollowing?.push(action.payload);
      }
    },
    likeButtonClicked: (state, action) => {
      console.log(action);
      const findPost = state?.user?.getAllPostsOfUser?.findIndex(
        (post) => post._id === action.payload.postId
      );
      console.log(findPost);
      const userInLikes = state.user.getAllPostsOfUser[findPost].likes.includes(
        action.payload.userId
      );
      console.log({ userInLikes });
      if (userInLikes) {
        console.log("if");
        state.user.getAllPostsOfUser[findPost].likes.splice(
          action.payload.userId,
          1
        );
      } else {
        console.log("else");
        state.user.getAllPostsOfUser[findPost].likes.push(
          action.payload.userId
        );
      }
    },
  },
  extraReducers: {
    [getUserIdFromParams().pending]: (state) => {
      state.status = "loading";
    },
    [getUserIdFromParams().fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "fulfilled";
    },
    [getUserIdFromParams().rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { followButtonClicked, likeButtonClicked } = userSlice.actions;
export default userSlice.reducer;
