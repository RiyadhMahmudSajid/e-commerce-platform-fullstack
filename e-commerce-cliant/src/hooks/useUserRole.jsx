import React, { useContext } from 'react';
import useAxios from './useAxios';
import { AuthContex } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const axiosInstance = useAxios()
    const { user, loading } = useContext(AuthContex)
    
    const { isLoading,  data: role } = useQuery({

        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const result = await axiosInstance.get(`/role?email=${user.email}`)
            
            return result.data.role;
        }


    })

    const allLoading = loading || isLoading
    return { role, allLoading }
};

export default useUserRole;