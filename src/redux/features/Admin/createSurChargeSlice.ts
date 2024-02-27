import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const postSurCharge = createAsyncThunk(
    "admin/createServiceCharge",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/surcharge/create", body);
            return response.data;
        } catch (error) {
            return error.response?.data;
        }
    }
);

const createSurChargeSlice = createSlice({
    name: "createSurCharge",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postSurCharge.pending, (state) => {
                state.loading = true;
            })
            .addCase(postSurCharge.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(postSurCharge.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not create Sur Charge";
            });
    },
});

export default createSurChargeSlice