import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const getAllAdmins = createAsyncThunk(
  "admin/fetchAdmins",
  async () => {
    try {
      const response = await axiosInstance.get("system/admin/view/admin");
      return response.data;
    } catch (error) {
      return error.response?.data?.errors;
    }
  }
);

const getAllAdminsSlice = createSlice({
  name: "allAdmin",
  initialState: {
    data: null,
    success: false,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          state.success = true;
          state.data = payload.data;
          state.error = null;
        } else {
          state.success = false;
          state.data = null;
          state.error = "No data available";
        }
        state.loading = false;
      })
      .addCase(getAllAdmins.rejected, (state) => {
        state.success = false;
        state.error = "Could not fetch admin list";
        state.loading = false;
      });
  },
});

export default getAllAdminsSlice;
