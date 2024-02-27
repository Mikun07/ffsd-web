import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../config/api";
import { userToken } from "../../config/auth";
import { EnhancedStore } from "@reduxjs/toolkit";
import { logout } from "../features/loginSlice";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useInterceptor = (instance: AxiosInstance, store: EnhancedStore) => {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${userToken || JSON.parse(localStorage.getItem("userToken"))}`;
    return config;
  });
  
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const errorResponse = error.response;
  
      if (
        errorResponse &&
        (errorResponse.status === 401 || errorResponse === 403) &&
        !originalRequest._retry
      ) {
          originalRequest._retry = true;
          try {
              // use refresh token to refresh auth
              // store the new auth token in originalRequest.headers.Authorization
          } catch (error) {
              // logout, clear token
              store.dispatch(logout())
              return Promise.reject(error)
          }
      }

      return Promise.reject(error)
    }
  );
}

export default axiosInstance
