import axios from "axios";
import { FATCH_URL_API } from "../constant";


export const postNote = async (url, data) => {
    try {
        return await axios.post(`${FATCH_URL_API}${url}`, data)
    } catch (error) {
        console.log(error)
    }
}

export const getNotes = async (url) => {
    try {
        return await axios.get(`${FATCH_URL_API}${url}`)
    } catch (err) {
        console.log(err)
    }
}

export const deleteNote = async (url, data) => {
    try {
        return await axios.delete(`${FATCH_URL_API}${url}`, data)
    } catch (error) {
        console.log(error)
    }
}

export const UpdateNote = async (url, data) => {
    try {
        return await axios.put(`${FATCH_URL_API}${url}`, data)
    } catch (error) {
        console.log(error)
    }
}
