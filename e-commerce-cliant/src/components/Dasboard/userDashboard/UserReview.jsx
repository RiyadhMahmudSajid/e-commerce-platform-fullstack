import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContex } from '../../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Star, Send, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../loading/Loading';

const UserReview = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContex);

    const { data: order = [], isLoading } = useQuery({
        queryKey: ['order', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/order?email=${user?.email}`);
           
            return result.data;
        }
    });

    if(isLoading){
        <Loading></Loading>
    }

    const handleRatingClick = (selectedStar) => {
        if (rating === selectedStar) {
            setRating(0);
        } else {
            setRating(selectedStar);
        }
    };

    const onSubmit = async (data) => {
    
        if (rating === 0) return toast.error("Please select a star rating!");

        const reviewData = {
            rating: rating,
            comment: data.comment,
            reviewDate: new Date(),
        };

        


        try {
            const res = await axiosSecure.patch(`/reviews?product=${data.product}&email=${user.email}`, reviewData);
           
            toast.success("Review submitted successfully!");
            reset();
            setRating(0);

        } catch (error) {
            toast.error("Failed to submit review");
        }
    };

    if (isLoading) return <div className="text-center p-10 font-bold text-text-muted italic">Loading Orders...</div>;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="bg-surface border border-border-color rounded-[2.5rem] p-8 md:p-12 shadow-sm">


                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-text-main uppercase tracking-tight">
                        Share Your <span className="text-accent">Experience</span>
                    </h2>
                    <p className="text-text-muted text-sm mt-2 font-medium italic tracking-wide">
                        Your feedback helps us grow and improve!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[11px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
                            <ShoppingBag size={14} className="text-accent" /> Select Purchased Product
                        </label>
                        <select
                            {...register("product", { required: true })}
                            className="w-full bg-bg-secondary border border-border-color text-text-main p-4 rounded-2xl focus:outline-none focus:border-accent font-bold text-sm appearance-none cursor-pointer hover:bg-bg-secondary/80 transition-all"
                        >
                            <option value="">Choose an item from your orders...</option>
                            {order.map((item) => (
                                <option key={item._id} value={item.productId}>
                                    {item.productName}
                                </option>
                            ))}
                        </select>
                        {errors.product && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2">Please select a product to review</span>}
                    </div>

                    <div className="flex flex-col items-center justify-center p-8 bg-bg-secondary/40 rounded-[2rem] border border-border-color/50">
                        <label className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mb-6">How many stars would you give?</label>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`transition-all duration-300 transform outline-none ${(hover || rating) >= star ? 'text-accent scale-125' : 'text-gray-300 scale-100 hover:text-gray-400'
                                        }`}
                                    onClick={() => handleRatingClick(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <Star
                                        size={36}

                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="mt-4 text-[10px] font-black text-accent uppercase tracking-widest animate-pulse">
                                {rating} Star{rating > 1 ? 's' : ''} Selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="block text-[11px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Your Detailed Review</label>
                        <textarea
                            {...register("comment", { required: true, minLength: 10 })}
                            placeholder="What was your experience with this product?..."
                            className="w-full bg-bg-secondary border border-border-color text-text-main p-6 rounded-[2rem] focus:outline-none focus:border-accent min-h-[160px] font-medium placeholder:text-text-muted/40 leading-relaxed transition-all"
                        ></textarea>
                        {errors.comment && (
                            <span className="text-red-500 text-[10px] font-bold mt-1 ml-2">
                                Please write at least 10 characters about your experience
                            </span>
                        )}
                    </div>


                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-accent/10 uppercase tracking-[0.2em] text-xs"
                    >
                        Publish Review <Send size={16} />
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UserReview;