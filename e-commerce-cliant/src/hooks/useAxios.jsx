import React from 'react';
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: `https://e-commerce-server-sable.vercel.app`
})
const useAxios = () => {
    return axiosInstance
};

export default useAxios;



