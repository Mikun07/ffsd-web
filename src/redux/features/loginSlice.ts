import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { BaseState } from "../../types/redux/root";

export interface LoginState extends BaseState {
  isLoggedIn: boolean
}

const initialState: LoginState = {
  success: false,
  data: null,
  error: null,
  isLoggedIn: false,
  loading: false,
};

export const postLogin = createAsyncThunk("login/postSignUp", async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("userToken", "");
      state.isLoggedIn = false;
      state.data = null;
      location.assign("/login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.error) {
        state.success = false;
        state.data = null;
        state.error = payload?.error || payload?.message;
      } else {
        localStorage.setItem(
          "userToken",
          JSON.stringify(payload?.token || "")
        );
        (state.success = true),
          (state.isLoggedIn = true),
          (state.data = payload?.data?.user),
          (state.error = null);
      }
      state.loading = false;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action?.error?.message || "Could not login";
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice;