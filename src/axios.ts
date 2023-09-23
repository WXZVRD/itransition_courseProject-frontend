import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://itransition-courseproject-backend.onrender.com',
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_user_token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
