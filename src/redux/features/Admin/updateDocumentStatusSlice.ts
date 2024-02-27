import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};

export const updateDocumentStatus = createAsyncThunk(
    "admin/updateDocumentStatus",
    async (body) => {
        try {
            const response = await axiosInstance.post("/system/admin/verify/document", body);
            return response.data;
        } catch (error) {
            return error.response?.data;
        }
    }
);

const updateDocumentStatusSlice = createSlice({
    name: "editingDocumentStatus",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateDocumentStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDocumentStatus.fulfilled, (state, action) => {
                const { payload } = action;
                console.log({ payload })
                state.success = true;
                state.data = payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(updateDocumentStatus.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message || "Could not update document status";
            });
    },
});

export default updateDocumentStatusSlice