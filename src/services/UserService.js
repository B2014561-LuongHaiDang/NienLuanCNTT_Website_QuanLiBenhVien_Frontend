import axios from "axios"

export const axiosJwt = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, data)
    return res.data
}

export const getDetaislUser = async (id, access_token) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers:{
            token: `Bearer ${access_token}`,

        }
    })
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials : true
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
    return res.data
}

export const updateUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data)
    return res.data
}

export const getAllUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
    return res.data
}

export const deleteUser = async (id) => {
        const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`);
        return res.data;
};
