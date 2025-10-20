import axios from 'axios'

const url = 'http://localhost:3000'
const axiosInnstance = axios.create({
    baseURL:`${url}/api/v1`,
    withCredentials:true
})

export default axiosInnstance
