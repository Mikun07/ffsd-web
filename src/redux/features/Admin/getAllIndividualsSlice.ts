import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const getAllIndividuals = createAsyncThunk(
  "admin/fetchAdmins",
  async () => {
    try {
      const response = await axiosInstance.get("system/admin/view/indv");
      return response.data;
    } catch (error) {
      console.log(error?.response?.data)
      return error.response?.data;
    }
  }
);

const getAllIndividualsSlice = createSlice({
  name: "allIndividual",
  initialState: {
    data: null,
    success: false,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllIndividuals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllIndividuals.fulfilled, (state, action) => {
        const { payload } = action;
        state.success = true;
        state.data = payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllIndividuals.rejected, (state) => {
        state.success = false;
        state.error = "Could not fetch individual list";
        state.loading = false;
      });
  },
});

export default getAllIndividualsSlice;
