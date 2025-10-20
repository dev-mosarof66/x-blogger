import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000'
const axiosInnstance = axios.create({
    baseURL:`${url}/api/v1`,
    withCredentials:true
})

export default axiosInnstance
