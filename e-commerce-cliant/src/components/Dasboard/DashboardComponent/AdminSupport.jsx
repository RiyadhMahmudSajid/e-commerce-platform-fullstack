import React from 'react';
import { useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminSupport = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();



    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/support', data);
            if (res.data) {
                toast.success("Support data saved!");
               
            }
        } catch (error) {
            toast.error("Error saving data");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Admin Support Control</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Support Email</label>
                    <input
                        {...register("email")}
                      
                        className="w-full p-2 border rounded mt-1"
                        placeholder="email@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Support Phone</label>
                    <input
                        {...register("phone")}
                       
                        className="w-full p-2 border rounded mt-1"
                        placeholder="+88012345678"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Urgent Notice</label>
                    <textarea
                        {...register("notice")}
                       
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Write something for users..."
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full hover:bg-blue-700">
                    Save Support Details
                </button>
            </form>
        </div>
    );
};

export default AdminSupport;