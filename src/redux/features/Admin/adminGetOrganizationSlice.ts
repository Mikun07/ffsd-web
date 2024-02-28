import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchOrganization = createAsyncThunk(
    "admin/fetchOrganization",
    async () => {
        try {
            const response = await axiosInstance.post("/system/admin/get/all/companies");
            return response?.data
        } catch (error) {
            return error?.response?.data?.errors;
        }
    }
);

const GetOrganizationSlice = createSlice({
    name: "getOrganization",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchOrganization.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrganization.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload?.data;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(fetchOrganization.rejected, (state) => {
            state.success = false;
            state.error = "Could not fetch document";
            state.loading = false;
        });
    },
});

export default GetOrganizationSlice;