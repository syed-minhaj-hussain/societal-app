import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userAPI";

const getAuth = JSON.parse(localStorage.getItem("token")) || null;
const getId = JSON.parse(localStorage.getItem("_id")) || null;
console.log({ getAuth, getId });
export const fetchUserByUserId = createAsyncThunk(
  "users/fetchUserByUserId",
  async () => {
    const response = await getUser(getAuth, getId);
    console.log(response);
    return response?.data?.rest;
  }
);

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserByUserId.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserByUserId.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "fulfilled";
    },
    [fetchUserByUserId.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
