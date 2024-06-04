import axios from "axios";

export const postNote = async (url, data) => {
    try {
        return await axios.post(`http://localhost:4000/api${url}`, data)
    } catch (error) {
        console.log(error)
    }
}

export const getNotes = async (url) => {
    try {
        return await axios.get(`http://localhost:4000/api${url}`)
    } catch (err) {
        console.log(err)
    }
}

export const deleteNote = async (url, data) => {
    try {
        return await axios.delete(`http://localhost:4000/api${url}`, data)
    } catch (error) {
        console.log(error)
    }
}

export const UpdateNote = async (url, data) => {
    try {
        return await axios.put(`http://localhost:4000/api${url}`, data)
    } catch (error) {
        console.log(error)
    }
}
