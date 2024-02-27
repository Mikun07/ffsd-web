import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import axios from "axios";
import { BASE_URL } from "../../config/api";
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
      const response = await axios.post("/doc/verify", body, {
        baseURL: BASE_URL,
        headers: {
          "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${userToken}`
        },
      });
      return response;
    } catch (error) {
      return error?.response?.data?.errors;
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
