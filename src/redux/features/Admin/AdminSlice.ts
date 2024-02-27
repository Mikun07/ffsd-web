import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../config/api";
import { BaseState } from "../../../types/redux/root";

export interface AdminLoginState extends BaseState {
  isAdminLoggedIn: boolean
}

const initialState: AdminLoginState = {
  success: false,
  data: null,
  error: null,
  isAdminLoggedIn: false,
  loading: false,
};

export const postAdminLogin = createAsyncThunk("login/postAdminSignUp", async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/system/admin/login`, body);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
});

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    adminLogout: (state) => {
      localStorage.setItem("userToken", "");
      state.isAdminLoggedIn = false;
      state.data = null;
      location.assign("/login/admin");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAdminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postAdminLogin.fulfilled, (state, action) => {
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
          (state.isAdminLoggedIn = true),
          (state.data = payload?.user),
          (state.error = null);
      }
      state.loading = false;
    });
    builder.addCase(postAdminLogin.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
      state.loading = false;
    });
  },
});

export const { adminLogout } = adminLoginSlice.actions;

export default adminLoginSlice;