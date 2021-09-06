import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
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

export default userSlice.reducer;
