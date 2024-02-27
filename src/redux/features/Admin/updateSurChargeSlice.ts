import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const updateSurCharge = createAsyncThunk(
    "admin/updateSurCharge",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/surcharge/update", body);
            return response.data;
        } catch (error) {
            return error.response?.data;
        }
    }
);

const updateSurChargeSlice = createSlice({
    name: "editingSurCharge",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateSurCharge.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSurCharge.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(updateSurCharge.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not update Sur Charge";
            });
    },
});

export default updateSurChargeSlice