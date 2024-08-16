import axios from "axios";

export const axiosBase = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_SHEET_URL
})
