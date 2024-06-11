import axios from "axios";
import {Varcel_Fatch_Url_API } from "../constant";


export const postNote = async (url, data) => {
    try {
        // return await axios.post(`${FATCH_URL_API}${url}`, data) //for local Fatch
        return await axios.post(`${Varcel_Fatch_Url_API}${url}`, data,) //for Varcel Fatch

    } catch (error) {
        console.log(error)
    }
}

export const getNotes = async (url, userId) => {
    try {
        // return await axios.get(`${FATCH_URL_API}${url}`)//for local Fatch
        return await axios.get(`${Varcel_Fatch_Url_API}${url}`, {
            headers: {
                Authorization: `barear ${userId}`
            }
        })//for local Fatch
    } catch (err) {
        console.log(err)
    }
}

export const deleteNote = async (url, data) => {
    try {
        // return await axios.delete(`${FATCH_URL_API}${url}`, data)
        return await axios.delete(`${Varcel_Fatch_Url_API}${url}`, data)

    } catch (error) {
        console.log(error)
    }
}

export const UpdateNote = async (url, data) => {
    try {
        // return await axios.put(`${FATCH_URL_API}${url}`, data)
        return await axios.put(`${Varcel_Fatch_Url_API}${url}`, data)
    } catch (error) {
        console.log(error)
    }
}
