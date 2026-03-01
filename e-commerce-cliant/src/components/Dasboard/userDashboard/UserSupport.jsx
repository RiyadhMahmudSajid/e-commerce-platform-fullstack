import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const UserSupport = () => {
    const axiosSecure = useAxiosSecure();

    const { data: support = {}, isLoading } = useQuery({
        queryKey: ['support-info'],
        queryFn: async () => {
            const res = await axiosSecure.get('/support');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center p-10">Loading...</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
 
            {support?.notice && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                    <p className="text-yellow-700 font-bold">Notice: {support.notice}</p>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-6 text-center">Support Center</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="p-6 border rounded-lg shadow-sm bg-gray-50 text-center">
                    <h3 className="font-bold text-lg mb-2">Email Support</h3>
                    <p className="text-blue-600">{support?.email || "Not Available"}</p>
                </div>

                <div className="p-6 border rounded-lg shadow-sm bg-gray-50 text-center">
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-green-600">{support?.phone || "Not Available"}</p>
                </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border rounded-lg text-center">
                <h3 className="font-bold mb-2 text-blue-800">Need Help?</h3>
                <p className="text-sm text-blue-600 mb-4">Our team is available Saturday to Thursday (10AM - 6PM)</p>
                <a 
                    href={`mailto:${support?.email}`} 
                    className="bg-blue-600 text-white px-6 py-2 rounded-full inline-block font-bold"
                >
                    Contact Now
                </a>
            </div>
        </div>
    );
};

export default UserSupport;