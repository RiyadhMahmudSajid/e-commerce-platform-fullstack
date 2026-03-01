import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../loading/Loading';
import { Star, Mail, Tag, Calendar } from 'lucide-react';

const AdminUserView = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allorder = [], isLoading } = useQuery({
        queryKey: ['allorder'],
        queryFn: async () => {
            const result = await axiosSecure.get('/allorder');
            return result.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }


    const reviewedOrders = allorder.filter((order) => order?.rating > 0);

    return (
        <div className="p-6 bg-background min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter">
                            Customer <span className="text-accent">Reviews</span>
                        </h2>
                        <p className="text-text-muted text-sm font-medium mt-1">
                            Manage and view all product ratings from users.
                        </p>
                    </div>
                    <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-accent/20">
                        Total Reviews: {reviewedOrders.length}
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border-color bg-bg-secondary shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface border-b border-border-color">
                                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-text-muted">Product</th>
                                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-text-muted">Customer</th>
                                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-text-muted">Rating</th>
                                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-text-muted">Comment</th>
                                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-text-muted text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-color/50">
                                {reviewedOrders.length > 0 ? (
                                    reviewedOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-surface/50 transition-colors group">
                                         
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img 
                                                        src={order.photo} 
                                                        alt="" 
                                                        className="w-10 h-10 rounded-lg object-cover border border-border-color shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-text-main leading-none">{order.productName}</p>
                                                        <p className="text-[10px] text-text-muted mt-1 font-medium">ID: {order.productId?.slice(-6)}</p>
                                                    </div>
                                                </div>
                                            </td>

                                  
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-text-main">{order.email}</span>
                                                    <span className="text-[10px] text-text-muted flex items-center gap-1 uppercase tracking-tighter">
                                                        <Mail size={10} /> {order.email}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            size={12} 
                                                            className={i < order.rating ? "fill-accent text-accent" : "text-border-color"} 
                                                        />
                                                    ))}
                                                    <span className="ml-2 text-xs font-black text-text-main">{order.rating}</span>
                                                </div>
                                            </td>

                                  
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-text-main font-medium italic max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                                                    "{order.comment}"
                                                </p>
                                            </td>

                                  
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-xs font-bold text-text-main">
                                                        {new Date(order.reviewData).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-[10px] text-text-muted uppercase font-black tracking-widest">
                                                        {new Date(order.reviewData).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Tag className="text-border-color" size={40} />
                                                <p className="text-text-muted font-bold uppercase tracking-widest text-xs">No rated orders found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminUserView;