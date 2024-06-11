import axios from "axios";
import { Varcel_Fatch_Url_API } from "../constant"

export const signUp = async (url, data) => {
    try {
        return await axios.post(`${Varcel_Fatch_Url_API}${url}`, data, {
            withCredentials: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (url, data) => {
    try {
        return await axios.post(`${Varcel_Fatch_Url_API}${url}`, data, {
            withCredentials: true
        })
    } catch (error) {
        console.log(error)
    }
}

