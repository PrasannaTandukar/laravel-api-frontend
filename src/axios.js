import axios from 'axios'
import {useTokenStore} from "@/stores/token.js";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

// Request interceptor
axiosClient.interceptors.request.use((config) => {
    const store = useTokenStore()
    config.headers['Authorization'] = store.authenticationToken
    return config
})

// Response interceptor
axiosClient.interceptors.response.use((response) => {
    // Handle the response here
    return response.data
}, (error) => {
    // Handle errors here
    return Promise.reject(error)
})

export default axiosClient