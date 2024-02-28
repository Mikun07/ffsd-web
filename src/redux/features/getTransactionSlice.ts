import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchTransaction = createAsyncThunk(
    "user/getTransaction",
    async () => {
        try {
            const response = await axiosInstance.get("/user/view/transactions");
            return response?.data;
        } catch (error) {
            return error?.message || error.response?.data;
        }
    }
);

const getTransactionSlice = createSlice({
    name: "getTransaction",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchTransaction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTransaction.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(fetchTransaction.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error.message || "Could not fetch document";
        });
    },
})

export default getTransactionSlice;