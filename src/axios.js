import axios from 'axios'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

let authToken = ''
const storedToken = localStorage.getItem('token')
if (storedToken) {
    try {
        const parsedToken = JSON.parse(storedToken);
        if (parsedToken && parsedToken.authenticationToken) {
            authToken = `Bearer ${parsedToken.authenticationToken}`
        }
    } catch (error) {
        console.error('Error parsing token:', error);
    }
}

// Request interceptor
axiosClient.interceptors.request.use((config) => {
    config.headers['Authorization'] = authToken
    return config
})

// Response interceptor
axiosClient.interceptors.response.use((response) => {
    // Handle the response here
    return response
}, (error) => {
    // Handle errors here
    return Promise.reject(error)
})

export default axiosClient