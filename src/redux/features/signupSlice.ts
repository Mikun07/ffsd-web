import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { BaseState } from "../../types/redux/root";

const initialState: BaseState = {
  success: false,
  data: null,
  error: null,
  loading: false,
};

export const postSignUp = createAsyncThunk(
  "signUp/postSignUp",
  async (body) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, body);
      return response;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      (state.success = false), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postSignUp.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.data?.errors) {
        (state.success = false),
          (state.data = null),
          (state.error = payload?.data?.errors);
      } else {
        localStorage.setItem("userToken", JSON.stringify(payload?.data?.token));
        (state.success = true),
          (state.data = payload?.data?.user),
          (state.error = null);
      }
      state.loading = false;
    });
    builder.addCase(postSignUp.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
      state.loading = false;
    });
  },
});

export default signUpSlice;
