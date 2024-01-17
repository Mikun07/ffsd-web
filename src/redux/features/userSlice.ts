import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (body) => {
  try {
    const response = await axiosInstance.get("/user");
    return response;
  } catch (error) {
    return error?.response?.data?.errors;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.data?.errors) {
        state.success = false;
        state.data = null;
        state.error = payload?.data?.errors;
      } else {
        state.success = true;
        state.data = payload?.data;
        state.error = null;
      }
      state.loading = false
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.success = false;
      state.error = "Could not fetch user";
      state.loading = false
    });
  },
});

export default userSlice;
