import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const verifyDocument = createAsyncThunk(
  "user/verifyDocument",
  async (body) => {
    try {
      const response = await axiosInstance.post("/doc/verify");
      return response;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);

const verifyDocumentSlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      (state.success = false), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyDocument.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.data?.errors) {
        (state.success = false),
          (state.data = null),
          (state.error = payload?.data?.errors);
      } else {
        (state.success = true),
          (state.data = payload?.data?.user),
          (state.error = null);
      }
    });
    builder.addCase(verifyDocument.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
    });
  },
});

export default verifyDocumentSlice;
