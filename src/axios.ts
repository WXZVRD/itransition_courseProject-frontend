import axios from "axios";

import { getTokenFromCookie } from "./utils/coockieUtils";

const instance = axios.create({
    baseURL: 'http://localhost:3301',
})

instance.interceptors.request.use((config) => {
    const token = getTokenFromCookie()
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
