import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../config/api";
import { BaseState } from "../../../types/redux/root";

const initialState: BaseState = {
  success: false,
  data: null,
  error: null,
  loading: false,
};

export const postAdminSignUp = createAsyncThunk(
  "signUp/postAdminSignUp",
  async (body) => {
    try {
      const response = await axios.post(`${BASE_URL}/system/admin/signup`, body);
      return response;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);

const adminSignUpSlice = createSlice({
  name: "adminSignUp",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      (state.success = false), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAdminSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postAdminSignUp.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.data?.errors) {
        (state.success = false),
          (state.data = null),
          (state.error = payload?.data?.errors);
      } else {
        (state.success = true),
          (state.data = payload?.data[0]?.user),
          (state.error = null);
      }
      state.loading = false;
    });
    builder.addCase(postAdminSignUp.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
      state.loading = false;
    });
  },
});

export default adminSignUpSlice;
