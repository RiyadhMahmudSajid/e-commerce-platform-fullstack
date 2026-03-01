import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
    const axiosInstance = useAxios();

    const { isLoading, data: categories } = useQuery({
        queryKey: ['categorie'],
        queryFn: async () => {
            const result = await axiosInstance.get(`/category`);
            return result.data;
        }
    });

    return {
        isLoading,categories
    }
};

export default useCategory;