import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const deleteStaff = createAsyncThunk("org/deleteStaff", async (body) => {
    try {
        const response = await axiosInstance.post("/staff/delete", body);
        return response?.data;
    } catch (error) {
        return error?.message || error?.response?.data;
    }
});


const deleteStaffSlice = createSlice({
    name: "removeStaff",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteStaff.pending, (state) => {
            state.loading = true;
        }).addCase(deleteStaff.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        }).addCase(deleteStaff.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error.message || "Could not delete staff";
        });
    },
});

export default deleteStaffSlice;
