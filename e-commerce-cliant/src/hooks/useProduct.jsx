import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useProduct = () => {

    const axiosInstance = useAxios()

    const { isLoading, data: products = []  , refetch} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosInstance.get('/products');
            return res.data;
        },
    });

    return {  isLoading, products , refetch }
};

export default useProduct;