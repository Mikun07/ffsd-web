import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import store from "../store";
import { setLoggedInUser } from "./userSlice";

const initialState = {
  success: false,
  data: null,
  error: null,
  isLoggedIn: false,
  loading: false,
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
    logout: (state) => {
      localStorage.setItem("userToken", "");
      state.isLoggedIn = false;
      state.data = null;
      location.assign("/");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state, action) => {
      state.loading = true;
    });
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
      state.loading = false;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      (state.success = false), (state.error = action.error.message);
      state.loading = false;
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice;
