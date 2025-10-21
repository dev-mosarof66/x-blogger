import axios from 'axios'

const mode = import.meta.env.VITE_DEV_MODE
const url = mode === 'dev' ? 'http://localhost:3000' : import.meta.env.VITE_BACKEND_URI

const axiosInstance = axios.create({
    baseURL: `${url}/api/v1`,
    withCredentials: true,
    headers:{
        'Content-Type':'application/json'
    }
})

export default axiosInstance
