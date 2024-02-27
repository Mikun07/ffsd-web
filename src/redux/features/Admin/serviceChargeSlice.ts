import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchServiceCharge = createAsyncThunk(
    "admin/getServiceCharge",
    async () => {
        try {
            const response = await axiosInstance.post("/system/admin/base/charge/get");
            return response.data;
        } catch (error) {
            throw error.response?.data?.errors;
        }
    }
);

const serviceChargeSlice = createSlice({
    name: "getServiceCharge",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchServiceCharge.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServiceCharge.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload.data;
                state.error = null;
                state.loading = false;
            })
            .addCase(fetchServiceCharge.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not fetch Service Charge";
            });
    },
});

export default serviceChargeSlice;
