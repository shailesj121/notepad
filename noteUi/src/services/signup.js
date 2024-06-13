import axios from "axios";
import { Varcel_Auth_Url } from "../constant"

export const signUp = async (url, data) => {
    try {
        return await axios.post(`${Varcel_Auth_Url}${url}`, data, {
            withCredentials: 'omit'
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (url, data) => {
    try {
        return await axios.post(`${Varcel_Auth_Url}${url}`, data, {
            withCredentials: 'omit'
        })
    } catch (error) {
        console.log(error)
    }
}

