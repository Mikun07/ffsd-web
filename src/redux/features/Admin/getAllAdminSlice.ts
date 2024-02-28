import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const getAllAdmins = createAsyncThunk(
  "admin/fetchAdmins",
  async () => {
    try {
      const response = await axiosInstance.get("/system/admin/view/admin");
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
        state.success = true;
        state.data = payload?.data;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllAdmins.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = "Could not fetch admin list";
      });
  },
});

export default getAllAdminsSlice;
