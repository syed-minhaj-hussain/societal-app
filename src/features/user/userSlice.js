import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, follow, unFollow, searchUserApi } from "./userAPI";

// const getId = JSON.parse(localStorage.getItem("_id")) || null;

export const getUserIdFromParams = (paramsId, auth) => {
  const fetchUserByUserId = createAsyncThunk(
    "users/fetchUserByUserId",
    async () => {
      const response = await getUser(auth, paramsId);
      console.log({ response });
      return response?.data;
    }
  );
  return fetchUserByUserId;
};
export const followUser = (profileId, userId, auth) => {
  const fetchUser = createAsyncThunk("users/followUser", async () => {
    const response = await follow(auth, profileId, userId);
    console.log({ response });
    return response?.data;
  });
  return fetchUser;
};
export const unFollowUser = (profileId, userId, auth) => {
  const fetchUser = createAsyncThunk("users/unFollowUser", async () => {
    const response = await unFollow(auth, profileId, userId);
    console.log({ response });
    return response?.data;
  });
  return fetchUser;
};
export const searchUserByName = (name, auth) => {
  const getUserByName = createAsyncThunk("users/searchUser", async () => {
    const response = await searchUserApi(auth, name);
    console.log({ response });
    return response?.data;
  });
  return getUserByName;
};

const initialState = {
  user: [],
  follow: [],
  unFollow: [],
  searchUser: [],
  status: "idle",
  error: null,
  followingStatus: "idle",
  unFollowStatus: "idle",
  searchStatus: "idle",
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
      state.searchStatus = "error";
      state.error = action.error.message;
    },
    [searchUserByName().pending]: (state) => {
      state.searchStatus = "loading";
    },
    [searchUserByName().fulfilled]: (state, action) => {
      state.searchUser = action.payload;
      state.searchStatus = "fulfilled";
    },
    [searchUserByName().rejected]: (state, action) => {
      state.searchStatus = "error";
      state.error = action.error.message;
    },
  },
});

export const { followButtonClicked, likeButtonClicked } = userSlice.actions;
export default userSlice.reducer;
