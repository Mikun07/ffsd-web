import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const updateStaff = createAsyncThunk("org/updateStaff", async (body) => {
    try {
        const response = await axiosInstance.post("/staff/update", body);
        return response.data;
    } catch (error) {
        return error?.message || error?.response?.data;
    }
});

const updateStaffSlice = createSlice({
    name: "editingStaff",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateStaff.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(updateStaff.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not update staff";
            });
    },
});

export default updateStaffSlice;
