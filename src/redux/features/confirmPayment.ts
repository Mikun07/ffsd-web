import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const confirmPayment = createAsyncThunk(
    "user/confirmPayment",
    async (body) => {
        try {
            console.log({body});
            const response = await axiosInstance.post("/doc/confirm/transaction", body);
            console.log({response});
            return response.data;
        } catch (error) {
            console.log({error});
            throw error.response?.data
        }
    }
);

const confirmPaymentSlice = createSlice({
    name: "checkPayment",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(confirmPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(confirmPayment.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload.data;
                state.error = null;
                state.loading = false;
            })
            .addCase(confirmPayment.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default confirmPaymentSlice;
