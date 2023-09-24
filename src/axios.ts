import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3301',
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_user_token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
