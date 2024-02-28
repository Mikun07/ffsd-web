import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import { userToken } from "../../config/auth";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const postDocument = createAsyncThunk(
  "user/postDocument",
  async (body) => {

    try {
      const response = await axiosInstance.post("/doc/verify", body, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": 'multipart/form-data',
        },
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const verifyDocumentSlice = createSlice({
  name: "verify",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(postDocument.fulfilled, (state, action) => {
        const { payload } = action;
        state.success = true;
        state.data = payload
        state.error = null;
        state.loading = false;
      })
      .addCase(postDocument.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message || "Could not get cost";
      });
  },
});

export default verifyDocumentSlice;
