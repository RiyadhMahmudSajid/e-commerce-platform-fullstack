import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContex } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: `https://e-commerce-server-sable.vercel.app`,
    withCredentials: true 
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContex);
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                   
                    await logOut(); 
                    navigate('/login'); 
                }
                return Promise.reject(error);
            }
        );


        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;