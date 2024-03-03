import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const fetchInstitution = createAsyncThunk(
  "user/fetchInstitution",
  async (body) => {
    try {
      const response = await axiosInstance.get("/institutions/all");
      return response?.data;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);

const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInstitution.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchInstitution.fulfilled, (state, action) => {
      const { payload } = action;
      state.success = true;
      state.data = payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(fetchInstitution.rejected, (state, action) => {
      state.success = false;
      state.error = "Could not fetch institution";
      state.loading = false;
    });
  },
});

export default institutionSlice;