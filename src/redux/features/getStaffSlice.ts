import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchStaff = createAsyncThunk(
    "org/getStaff",
    async (type) => {
        try {
            const response = await axiosInstance.post("/staff/get/all", type);
            return response?.data;
        } catch (error) {
            return error?.message || error.response?.data;
        }
    }
);

const getStaffSlice = createSlice({
    name: "getStaff",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchStaff.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStaff.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(fetchStaff.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error.message || "Could not fetch document";
        });
    },
})

export default getStaffSlice;