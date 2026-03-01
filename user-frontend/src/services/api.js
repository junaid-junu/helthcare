import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('patientInfo');
    if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        if (parsedInfo.token) {
            config.headers.set('Authorization', `Bearer ${parsedInfo.token}`);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
