import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const postCreateStaff = createAsyncThunk("org/createStaff", async (body) => {
    try {
        const response = await axiosInstance.post("/staff/create", body);
        return response.data;
    } catch (error) {
        return error?.message || error?.response?.data;
    }
});


const createStaffSlice = createSlice({
    name: "createStaff",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postCreateStaff.pending, (state) => {
                state.loading = true;
            })
            .addCase(postCreateStaff.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(postCreateStaff.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not create staff";
            });
    },
});

export default createStaffSlice;
