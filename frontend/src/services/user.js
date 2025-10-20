import axiosInnstance from "../utils/axios"

export const fetchUser = async () => {
    try {
        const res = await axiosInnstance.get('/user/')
        return res.data
    } catch (error) {
        console.log(`error in fetching user : `, error)
    }
}