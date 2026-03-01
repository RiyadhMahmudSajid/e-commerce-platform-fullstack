import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../loading/Loading';
import { Trash2, CheckCircle, Clock, Truck, XCircle, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AdminOrderView = () => {
    const queryClient = useQueryClient();
    const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()

    const { data: allorder = [], isLoading } = useQuery({
        queryKey: ['allorder'],
        queryFn: async () => {
            const result = await axiosSecure.get('/allorder');
            return result.data;
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, newStatus }) => axiosInstance.patch(`/order/${id}`, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries(['order']);
            toast.success("order status update")
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/order/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['order']);
            toast.success("Order deleted permanently");
        }
    })



    if (isLoading) return <Loading />;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">


            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-main tracking-tight">Manage Orders</h2>
                    <p className="text-sm text-text-muted font-medium">Total {allorder.length} orders found in the system</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-bg-secondary border border-border-color rounded-xl text-xs font-bold text-text-main hover:bg-bg-primary transition-all">
                        Export Report
                    </button>
                </div>
            </div>

    
            <div className="bg-bg-secondary rounded-3xl border border-border-color overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-bg-primary/50 border-b border-border-color">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">User Email</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Product & ID</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-color/50">
                            {allorder.map((order) => (
                                <tr key={order._id} className="hover:bg-bg-primary/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-text-main">{order.email}</p>
                                        <p className="text-[10px] text-text-muted font-mono">{order.transactionId}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-text-main">{order.productName}</p>
                                        <p className="text-[10px] text-text-muted uppercase">Qty: {order.quantity}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-black text-accent">${order.totalAmount}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            defaultValue={order.status}
                                            onChange={(e) => updateStatusMutation.mutate({ id: order._id, newStatus: e.target.value })}
                                            className={`text-[10px] font-bold uppercase py-1.5 px-3 rounded-lg border focus:outline-none transition-all cursor-pointer
                                                ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                                                    order.status === 'delivered' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                                                        'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure?")) deleteMutation.mutate(order._id)
                                                }}
                                                className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                                title="Delete Order"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderView;