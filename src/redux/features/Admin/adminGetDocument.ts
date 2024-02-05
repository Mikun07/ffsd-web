import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const adminFetchDocument = createAsyncThunk(
  "admin/fetchDocument",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        "system/admin/get/all/documents",
        body
      );
      return response;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);

const adminDocumentSlice = createSlice({
  name: "adminDocument",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(adminFetchDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminFetchDocument.fulfilled, (state, action) => {
      const { payload } = action;
      // const success = payload?.data?.success;
      const data = payload?.data;
      if (!data.length) {
        state.success = false;
        state.data = null;
        state.error = payload?.data?.errors;
      } else {
        state.success = true;
        state.data = data;
        state.error = null;
      }
      state.loading = false;
    });
    builder.addCase(adminFetchDocument.rejected, (state, action) => {
      state.success = false;
      state.error = "Could not fetch document";
      state.loading = false;
    });
  },
});

export default adminDocumentSlice;