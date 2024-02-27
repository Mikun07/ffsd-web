import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const initiatePayment = createAsyncThunk(
    "user/initiatePayment",
    async (body) => {
        try {
            const response = await axiosInstance.post("/doc/initiate/payment", body);
            return response.data;
        } catch (error) {
            throw error.response?.data;
        }
    }
);

const initiatePaymentSlice = createSlice({
    name: "startPayment",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(initiatePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(initiatePayment.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = JSON.parse(payload.data)
                state.error = null;
                state.loading = false;
            })
            .addCase(initiatePayment.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default initiatePaymentSlice;
