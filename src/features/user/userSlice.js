import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postSlice from "../posts/postSlice";
import { getUser, follow, unFollow } from "./userAPI";

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
export const followUser = (profileId, userId) => {
  const fetchUser = createAsyncThunk("users/followUser", async () => {
    const response = await follow(getAuth, profileId, userId);
    console.log({ response });
    return response?.data;
  });
  return fetchUser;
};
export const unFollowUser = (profileId, userId) => {
  const fetchUser = createAsyncThunk("users/unFollowUser", async () => {
    const response = await unFollow(getAuth, profileId, userId);
    console.log({ response });
    return response?.data;
  });
  return fetchUser;
};

const initialState = {
  user: [],
  follow: [],
  unFollow: [],
  status: "idle",
  error: null,
  followingStatus: "idle",
  unFollowStatus: "idle",
};
console.log(initialState.followingStatus);

const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    followButtonClicked: (state, action) => {
      console.log(action);
      const userInFollowers = state?.user?.myFollowers.some(
        ({ _id }) => _id === action.payload._id
      );
      console.log({ userInFollowers });
      if (userInFollowers) {
        state?.user?.myFollowers?.splice(
          ({ _id }) => _id === action.payload._id,
          1
        );
      } else {
        state?.user?.myFollowers?.push(action.payload);
      }
    },
    likeButtonClicked: (state, action) => {
      // console.log(action);
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
    [followUser().pending]: (state) => {
      state.followingStatus = "loading";
    },
    [followUser().fulfilled]: (state, action) => {
      state.follow = action.payload;
      state.followingStatus = "fulfilled";
    },
    [followUser().rejected]: (state, action) => {
      state.followingStatus = "error";
      state.error = action.error.message;
    },
    [unFollowUser().pending]: (state) => {
      state.unFollowStatus = "loading";
    },
    [unFollowUser().fulfilled]: (state, action) => {
      state.unFollow = action.payload;
      state.unFollowStatus = "fulfilled";
    },
    [unFollowUser().rejected]: (state, action) => {
      state.unFollowStatus = "error";
      state.error = action.error.message;
    },
  },
});

export const { followButtonClicked, likeButtonClicked } = userSlice.actions;
export default userSlice.reducer;
