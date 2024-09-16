import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

export const DOMAIN: string =
  "https://66e440efd2405277ed13b142.mockapi.io/api/v1";
export const ACCESS_TOKEN: string = "accessToken";
export const USER_LOGIN: string = "userLogin";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ensure config.headers exists
    if (config.headers) {
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json", // Set Content-Type as an example
      } as AxiosRequestHeaders; // Ensure proper typing
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Handle the response
    return response;
  },
  (error) => {
    // Handle response errors (e.g., redirect to login on 401/403 errors)
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;
