import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response?.data;
  } catch (error) {
    return error?.response?.data?.errors;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.data = action.payload.data.user;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.success = !!payload;
        state.data = payload;
        state.error = payload ? null : action.payload.errors;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = "Could not fetch user";
      });
  },
});

export const { setLoggedInUser } = userSlice.actions;
export default userSlice;
