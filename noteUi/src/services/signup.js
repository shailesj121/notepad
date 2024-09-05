import axios from "axios";
import { Varcel_Auth_Url, Auth_URL_API } from "../constant"

export const signUp = async (url, data) => {
    try {

        // return await axios.post(`${Auth_URL_API}${url}`, data, {
        //     withCredentials: true,
        // }

        return await axios.post(`${Varcel_Auth_Url}${url}`, data, {
            withCredentials: true,
        }
    )
    } catch (error) {
        console.log(error)
    }
}

export const login = async (url, data) => {
    try {
        // return await axios.post(`${Auth_URL_API}${url}`, data, {
        //     withCredentials: true,
        // }

        return await axios.post(`${Varcel_Auth_Url}${url}`, data, {
            withCredentials: true,
        }
    )
    } catch (error) {
        console.log(error)
    }
}

