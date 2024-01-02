import axios from "axios";
import { BASE_URL } from "../../config/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   // set token
// });

axiosInstance.interceptors.response.use(
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
        }
    }
  }
);

// console.log({axiosInstance})

export default axiosInstance
