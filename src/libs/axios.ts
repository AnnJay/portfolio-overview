import axios, { AxiosInstance } from "axios";

const BASE_HTTPS_URL: string = "https://api.binance.com/api/";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_HTTPS_URL,
});
