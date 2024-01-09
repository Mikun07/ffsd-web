import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const initialState = {
  success: false,
  data: null,
  error: null,
  isLoggedIn: false,
};

export const postLogin = createAsyncThunk("login/postSignUp", async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, body);
    return response;
  } catch (error) {
    return error?.response?.data?.errors;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      (state.success = false), (state.error = null), (state.isLoggedIn = false);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.data?.errors) {
        (state.success = false),
          (state.data = null),
          (state.error = payload?.data?.errors);
      } else {
        localStorage.setItem("userToken", JSON.stringify(payload?.data?.token));
        (state.success = true),
          (state.isLoggedIn = true),
          (state.data = payload?.data?.user),
          (state.error = null);
      }
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
    });
  },
});

export default loginSlice;
