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
      return response?.data;
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
    builder.addCase(fetchDocument.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchDocument.fulfilled, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.success = !!payload;
        state.data = payload;
        state.error = payload ? null : action.payload.errors;
      })
      .addCase(fetchDocument.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = "Could not fetch user";
      });
  },
});

export default documentSlice;
