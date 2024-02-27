import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const updateServiceCharge = createAsyncThunk(
    "admin/updateServiceCharge",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/base/charge/update", body);
            return response.data;
        } catch (error) {
            return error.response?.data?.error;
        }
    }
);

const updateServiceChargeSlice =  createSlice({
    name: "editingServiceCharge",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateServiceCharge.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateServiceCharge.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(updateServiceCharge.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not update Service Charge";
            });
    },
});

export default updateServiceChargeSlice