import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const postServiceCharge = createAsyncThunk(
    "admin/createServiceCharge",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/base/charge/create", body);
            return response.data;
        } catch (error) {
            return error.response?.data?.error;
        }
    }
);

const createServiceChargeSlice = createSlice({
    name: "createServiceCharge",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postServiceCharge.pending, (state) => {
                state.loading = true;
            })
            .addCase(postServiceCharge.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(postServiceCharge.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not create Service Charge";
            });
    },
});

export default createServiceChargeSlice