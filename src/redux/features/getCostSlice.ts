import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { userToken } from "../../config/auth";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const fetchCost = createAsyncThunk(
    "user/getCost",
    async (body) => {
        try {
            const response = await axiosInstance.post("/doc/checkout", body, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return error.response?.data
        }
    }
);

const getCostSlice = createSlice({
    name: "cost",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCost.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCost.fulfilled, (state, action) => {
                const { payload } = action;
                state.success = true;
                state.data = payload
                state.error = null;
                state.loading = false;
            })
            .addCase(fetchCost.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not get cost";
            });
    },
});

export default getCostSlice;
