import axios from "axios";
import router from "../routes";
import { getToken, clearToken } from "../auth";

const Api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        Accept: "application/json",
    },
});

Api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

Api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Api;