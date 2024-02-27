import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchSurCharge = createAsyncThunk(
    "admin/getSurCharge",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/surcharge/view", body);
            return response.data;
        } catch (error) {
            throw error.response?.data?.errors;
        }
    }
);

const surChargeSlice = createSlice({
    name: "getSurCharge",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSurCharge.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSurCharge.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload.data;
                state.error = null;
                state.loading = false;
            })
            .addCase(fetchSurCharge.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not fetch sur Charge";
            });
    },
});

export default surChargeSlice;
