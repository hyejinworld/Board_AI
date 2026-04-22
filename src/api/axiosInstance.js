import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://15.164.103.94:5000/api ';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('Axios Initialized with baseURL:', baseURL);


export default axiosInstance;
