import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const monitorReferrals = createAsyncThunk(
    "org/getReferrals",
    async () => {
        try {
            const response = await axiosInstance.post("/monitor/document");
            return response?.data;
        } catch (error) {
            return error?.message || error.response?.data;
        }
    }
);

const getReferralsSlice = createSlice({
    name: "monitorReferrals",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(monitorReferrals.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(monitorReferrals.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(monitorReferrals.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error.message || "Could not fetch document";
        });
    },
})

export default getReferralsSlice;