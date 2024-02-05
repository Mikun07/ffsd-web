import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const fetchDocument = createAsyncThunk(
  "user/fetchDocument",
  async (type) => {
    try {
      const response = await axiosInstance.post("/get/documents", type);
      return response;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);


const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDocument.fulfilled, (state, action) => {
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
      state.loading = false;
    });
    builder.addCase(fetchDocument.rejected, (state, action) => {
      state.success = false;
      state.error = "Could not fetch document";
      state.loading = false;
    });
  },
});

export default documentSlice;
