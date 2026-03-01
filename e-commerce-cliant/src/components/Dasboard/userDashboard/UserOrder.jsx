import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContex } from '../../../providers/AuthProvider';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../loading/Loading';
import { ShoppingBag, Package, Clock, CheckCircle, ExternalLink, Delete, DeleteIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UserOrder = () => {
    const { user } = useContext(AuthContex);
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const { isLoading, data: orders = [] } = useQuery({
        queryKey: ['order', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/order?email=${user?.email}`);
           
            return result.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/order/${id}?email=${user?.email}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['order', user?.email])
            toast.success("Order deleted permanently");
        }
    })

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-main tracking-tight">Purchase History</h2>
                    <p className="text-sm text-text-muted font-medium">Manage and track your recent orders</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border-color rounded-xl">
                    <ShoppingBag size={18} className="text-accent" />
                    <span className="text-sm font-bold text-text-main">{orders.length} Total Orders</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-bg-secondary rounded-3xl border border-border-color p-20 text-center">
                    <div className="w-16 h-16 bg-bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted">
                        <Package size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-text-main">No orders found</h3>
                    <p className="text-sm text-text-muted mt-1">Looks like you haven't made any purchases yet.</p>
                </div>
            ) : (

                <div className="bg-bg-secondary rounded-3xl border border-border-color overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-bg-primary/50 border-b border-border-color">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Product</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Transaction ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Price</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-color/50">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-bg-primary/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-color overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={order?.photo || "https://i.ibb.co/3S6P2Gj/user.png"}
                                                        alt={order.productName}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main line-clamp-1">{order.productName}</p>
                                                    <p className="text-[10px] text-text-muted font-medium uppercase tracking-tighter">Qty: {order.quantity}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-mono font-medium text-text-muted">{order.transactionId}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-accent">${order.totalAmount}</p>
                                        </td>
                                        <td className="px-6 py-4 text-text-muted">
                                            
                                          {
                                            order?.status
                                          }
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteMutation.mutate(order._id)}
                                                className="p-2 hover:bg-accent/10 text-text-muted hover:text-accent rounded-lg transition-all">
                                                <Delete size={18}></Delete>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const statusStyles = {
        pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        shipped: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        success: "bg-green-500/10 text-green-600 border-green-500/20",
        cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
    };

    return (
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusStyles[status.toLowerCase()] || statusStyles.pending}`}>
            <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-current"></span>
                {status}
            </span>
        </span>
    );
};

export default UserOrder;