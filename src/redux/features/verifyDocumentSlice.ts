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
  reducers: {
    resetSuccess: (state) => {
      (state.success = false), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postDocument.fulfilled, (state, action) => {
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
    builder.addCase(postDocument.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
    });
  },
});

export default verifyDocumentSlice;
