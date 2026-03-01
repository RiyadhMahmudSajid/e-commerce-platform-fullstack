import React, { useContext } from 'react';
import {
    Mail, MapPin, Package, Heart, Star,
    ShoppingBag, ShieldCheck, Edit2, Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AuthContex } from '../../../providers/AuthProvider';
import useUserRole from '../../../hooks/useUserRole';
import { ModalContex } from '../../../providers/ModalProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UserEditProfile from './UserEditProfile';
import Loading from '../../loading/Loading';
import { CartContext } from '../../../providers/CartProvider';

const UserProfile = () => {
    const { user } = useContext(AuthContex);
    const { role } = useUserRole();
    const { showModal, setShowModal } = useContext(ModalContex);
    const { cart } = useContext(CartContext);
    const axiosSecure = useAxiosSecure();


    const { data: orders = [], isLoading: orderLoading } = useQuery({
        queryKey: ['order', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/order?email=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email
    });

   

    const { data: wishlist = [], isLoading: wishlistLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email
    });
    

    if (orderLoading || wishlistLoading) return <Loading />;

    const reviewedOrders = orders.filter((order) => order?.rating > 0);
    const totalOrdersCount = orders?.length || 0;
    const wishlistCount = wishlist?.length || 0;
    const reviewCount = reviewedOrders.length || 0;
    const cartCount = cart?.length || 0;
   
    const recentOrders = [...orders].reverse().slice(0, 2);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
           
            <div className="bg-bg-secondary rounded-3xl border border-border-color p-6 lg:p-10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/3S6P2Gj/user.png"}
                            className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl object-cover ring-4 ring-bg-primary"
                            alt="Profile"
                        />
                        <button
                            onClick={() => setShowModal(true)}
                            className="absolute -bottom-2 -right-2 p-2 bg-accent text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                            <h1 className="text-3xl font-bold text-text-main tracking-tight">
                                {user?.displayName || "Member"}
                            </h1>
                            <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded-md border border-accent/20">
                                {role || "Customer"}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-5 text-text-muted">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Mail size={16} className="text-accent" />
                                {user?.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck size={16} className="text-green-500" />
                                Verified Account
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<Package size={20} />} label="Total Orders" value={totalOrdersCount} color="accent" />
                <StatCard icon={<Heart size={20} />} label="Wishlist" value={wishlistCount} color="danger" />
                <StatCard icon={<Star size={20} />} label="Reviews" value={reviewCount} color="warning" />
                <StatCard icon={<ShoppingBag size={20} />} label="Cart Items" value={cartCount} color="info" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Security Section (Location এর বদলে) */}
                <div className="bg-bg-secondary rounded-3xl border border-border-color p-6 h-full">
                    <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
                        <MapPin size={18} className="text-accent" /> Security & Session
                    </h3>
                    <div className="p-4 bg-bg-primary rounded-2xl border border-border-color space-y-3">
                        <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase italic">Member Since</p>
                            <p className="text-sm font-semibold text-text-main">
                                {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div className="pt-3 border-t border-border-color">
                            <p className="text-[10px] font-bold text-text-muted uppercase italic">Last Login</p>
                            <p className="text-sm font-semibold text-text-main">
                                {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Just Now'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="lg:col-span-2 bg-bg-secondary rounded-3xl border border-border-color p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest flex items-center gap-2">
                            <Clock size={18} className="text-accent" /> Recent Activity
                        </h3>
                        <button className="text-[10px] font-bold text-accent uppercase hover:underline tracking-tighter">View All Orders</button>
                    </div>

                    <div className="space-y-3">
                        {recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                                <div key={order._id} className="flex items-center justify-between p-4 bg-bg-primary rounded-2xl border border-border-color hover:border-accent/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-main truncate w-32 md:w-full">{order.productName}</p>
                                            <p className="text-[10px] font-medium text-text-muted uppercase">
                                                {order.reviewData ? new Date(order.reviewData).toLocaleDateString() : 'Recent'} • {order.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-accent">${order.totalAmount || order.price}</p>
                                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${order.status === 'success' ? 'text-green-500 bg-green-500/10' : 'text-yellow-500 bg-yellow-500/10'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 bg-bg-primary rounded-2xl border border-dashed border-border-color">
                                <p className="text-text-muted text-xs font-bold uppercase tracking-widest">No recent activity found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center backdrop-blur-sm bg-black/50 p-4">
                    <UserEditProfile />
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    const colors = {
        accent: "text-accent bg-accent/10",
        danger: "text-red-500 bg-red-500/10",
        warning: "text-yellow-500 bg-yellow-500/10",
        info: "text-blue-500 bg-blue-500/10",
    };

    return (
        <div className="bg-bg-secondary p-5 rounded-3xl border border-border-color flex items-center gap-5">
            <div className={`p-3 rounded-2xl ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-0.5">{label}</p>
                <h4 className="text-2xl font-bold text-text-main leading-none tracking-tight">
                    {value < 10 && value > 0 ? `0${value}` : value}
                </h4>
            </div>
        </div>
    );
};

export default UserProfile;