import axios from "axios"

export const axiosJwt = axios.create()

export const createSchedule = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/schedule`, data)
    return res.data
}

export const updateSchedule = async (id, status) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/schedule/${id}`, status)
    return res.data
}

export const getAllSchedule = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/schedule`)
    return res.data
}

export const getDetailsSchedule = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/schedule/${id}`)
    return res.data
}