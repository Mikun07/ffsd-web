import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const adminFetchDocumentId = createAsyncThunk(
  "admin/fetchDocument/id",
  async (body: any) => {
    try {
      const response = await axiosInstance.post(
        `system/admin/get/single/document?doc_category=${body?.doc_type}&doc_id=${body?.id}&docOwnerId=${body?.docOwnerId}`,
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data?.errors;
    }
  }
);

const adminDocumentIdSlice = createSlice({
  name: "adminDocumentId",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(adminFetchDocumentId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminFetchDocumentId.fulfilled, (state, action) => {
      const { payload } = action;
      const {data} = payload;      
      if (!data) {
        state.success = false;
        state.data = null;
        state.error = payload?.data?.errors;
      } else {        
        state.success = true;
        state.data = payload.data;
        state.error = null;
      }
      state.loading = false;
    });
    builder.addCase(adminFetchDocumentId.rejected, (state) => {
      state.success = false;
      state.error = "Could not fetch document";
      state.loading = false;
    });
  },
});

export default adminDocumentIdSlice;