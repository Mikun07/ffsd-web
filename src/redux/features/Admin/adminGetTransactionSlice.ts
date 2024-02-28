import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const adminFetchTransaction = createAsyncThunk(
    "admin/adminGetTransaction",
    async () => {
        try {
            const response = await axiosInstance.get("/system/admin/view/transactions");
            return response?.data;
        } catch (error) {
            return error?.message || error.response?.data;
        }
    }
);

const adminGetTransactionSlice = createSlice({
    name: "adminGetTransaction",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(adminFetchTransaction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(adminFetchTransaction.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(adminFetchTransaction.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error.message || "Could not fetch document";
        });
    },
})

export default adminGetTransactionSlice;