import { Heart, ShoppingCart, Star } from 'lucide-react';
import React, { useContext } from 'react';
import { AuthContex } from '../../../providers/AuthProvider';
import useWhislist from '../../../hooks/useWhislist';
import toast from 'react-hot-toast';
import { CartContext } from '../../../providers/CartProvider';

const ShowCategory = ({ filterCategorie }) => {
    const { photo, name, discount, description, rating, price, oldPrice } = filterCategorie
    const { user } = useContext(AuthContex)
    const {addToCart} = useContext(CartContext)
    const { handleWhislist } = useWhislist()
    
    return (
        <section className="">
            <div className="">


                <div

                    className="group bg-bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >

                    <div className="relative overflow-hidden aspect-square">
                        <img
                            src={photo}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {discount && (
                            <span className="absolute top-3 left-3 bg-danger text-white px-3 py-1 rounded-full text-xs font-black">
                                -{discount}%
                            </span>
                        )}

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); if (!user) {
                                    return toast.error("Please login first!");
                                } handleWhislist(filterCategorie);
                            }}
                            className="absolute top-3 right-3 p-2 bg-bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-soft">
                            <Heart className="w-5 h-5 text-text-muted hover:text-danger transition-colors" />
                        </button>
                    </div>


                    <div className="p-5">
                        <h3 className="font-semibold text-lg text-text-main mb-2 line-clamp-1">
                            {name}
                        </h3>


                        <p className="text-sm text-text-muted mb-3">
                            {description?.split(' ').slice(0, 5).join(' ')}
                            {description?.split(' ').length > 5 && ' ...'}
                        </p>


                        <div className="flex items-center mb-3">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-2 text-sm text-text-muted">
                                {rating}
                            </span>
                        </div>


                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-text-main">
                                        ${price}
                                    </span>

                                    {oldPrice && (
                                        <span className="text-sm text-text-muted line-through">
                                            ${oldPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); addToCart(filterCategorie) }}
                                className="p-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-md shadow-accent/20">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowCategory;