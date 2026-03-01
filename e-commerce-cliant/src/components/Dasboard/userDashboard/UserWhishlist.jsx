import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContex } from '../../../providers/AuthProvider';
import Loading from '../../loading/Loading';
import { Heart, ShoppingCart, Trash2, ExternalLink, PackageOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { CartContext } from '../../../providers/CartProvider';
import { Link } from 'react-router';

const UserWhishlist = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContex);
    const queryClient = useQueryClient();
    const { addToCart, cart } = useContext(CartContext)
    const { isLoading, data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return result.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/wishlist/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist']);
            toast.success("Item removed");
        }
    });

    if (isLoading) return <Loading />;
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-main tracking-tight">My Wishlist</h2>
                    <p className="text-sm text-text-muted font-medium">You have {wishlist.length} items saved in your wishlist</p>
                </div>
                <div className='flex gap-5'>
                    <button
                        onClick={() => { addToCart(wishlist) }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all">
                        <ShoppingCart size={18} /> Add All to Cart
                    </button>
                    <Link to='/cart' className="relative p-2.5 rounded-xl bg-accent text-white shadow-lg shadow-accent/20 group">
                        <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1.5 -right-1.5 bg-danger text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-surface">{totalCount}</span>
                    </Link>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="bg-bg-secondary rounded-3xl border border-border-color p-20 text-center">
                    <PackageOpen size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
                    <h3 className="text-lg font-bold text-text-main">Your wishlist is empty</h3>
                    <p className="text-sm text-text-muted">Explore products and save your favorites!</p>
                </div>
            ) : (

                <div className="bg-bg-secondary rounded-3xl border border-border-color overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-bg-primary/50 border-b border-border-color">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Product Details</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Unit Price</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Date Added</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-color/50">
                                {wishlist.map((item) => (
                                    <tr key={item._id} className="hover:bg-bg-primary/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl bg-bg-primary border border-border-color overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main line-clamp-1">{item.name}</p>
                                                    <p className="text-[10px] text-accent font-bold uppercase tracking-tighter">In Stock</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-black text-text-main">${item.price}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-medium text-text-muted">
                                                {new Date(item.addedAt).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button

                                                    onClick={() => { addToCart(item) }}
                                                    className="p-2.5 bg-accent/10 text-accent rounded-xl hover:bg-accent hover:text-white transition-all"
                                                    title="Add to Cart"

                                                >
                                                    <ShoppingCart size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteMutation.mutate(item._id)}
                                                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                                    title="Remove"
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
            )}
        </div>
    );
};

export default UserWhishlist;