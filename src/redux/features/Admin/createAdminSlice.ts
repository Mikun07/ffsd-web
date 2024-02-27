import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const postCreateAdmin = createAsyncThunk(
    "admin/createAdmin",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/create/admin", body);
            return response.data;
        } catch (error) {
            return error.response?.data?.error;
        }
    }
);

const createAdminSlice = createSlice({
    name: "createAdmin",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postCreateAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(postCreateAdmin.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(postCreateAdmin.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not fetch All Admin";
            });
    },
});

export default createAdminSlice;
