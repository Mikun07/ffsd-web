import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchReferral = createAsyncThunk("user/fetchReferral", async (body: any) => {
    try {
        const response = await axiosInstance.post(`get/referral?referral=${body?.referral}`);
        console.log(response?.data)
        return response?.data;
    } catch (error) {
        return error?.response?.data;
    }
});

const referralSlice = createSlice({
    name: "getReferral",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchReferral.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchReferral.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(fetchReferral.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error.message || "Could not fetch referral";
        });
    },
});

export default referralSlice;
