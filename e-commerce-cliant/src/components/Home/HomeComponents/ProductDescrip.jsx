import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router';
import useProduct from '../../../hooks/useProduct';
import {
    Star,
    ShoppingCart,
    Heart,
    ShieldCheck,
    Truck,
    ArrowLeft,
    Zap
} from 'lucide-react';
import Loading from '../../loading/Loading';
import { CartContext } from '../../../providers/CartProvider';
import { AuthContex } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useWhislist from '../../../hooks/useWhislist';

const ProductDescrip = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContex)
    const { products, isLoading } = useProduct();
    const { addToCart } = useContext(CartContext);
    const [showZoom, setShowZoom] = useState(false);
    const {handleWhislist} = useWhislist()
    const [bgPos, setBgPos] = useState("50% 50%");
    const axiosSecure = useAxiosSecure()

    if (isLoading) return <Loading />;

    const product = products.find(p => p._id === id);

    const handleBuyNow = async () => {
        if (!user) {
            toast.error('Log in fast')
            return
        }
        const orderInfo = {
            email: user?.email,
            productId: product._id,
            productName: product.name,
            productCategory: product.category,
            price: product.price,
            quantity: 1,
            photo: product.photo,
            totalAmount: product.price,
            status: "pending",
        };
        const response = await axiosSecure.post('/orders/create', orderInfo)
       
        if (response.data?.gateWayPageUrl) {
            window.location.replace(response.data.gateWayPageUrl)
        }
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/" className="mt-4 text-accent flex items-center gap-2">
                    <ArrowLeft size={18} /> Back
                </Link>
            </div>
        );
    }

    const handleMouseMove = (e) => {
      
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setBgPos(`${x}% ${y}%`);
    };

    return (
        <section className=" bg-surface">
            <div className='py-14 max-w-7xl mx-auto px-4'>
                <div className="flex flex-col lg:flex-row gap-12 relative">


                    <div className="w-full lg:w-1/2 flex gap-6 ">


                        <div
                            onMouseEnter={() => setShowZoom(true)}
                            onMouseLeave={() => setShowZoom(false)}
                            onMouseMove={handleMouseMove}
                            className="relative w-4/5 aspect-square overflow-hidden rounded-2xl border cursor-crosshair bg-bg-secondary"
                        >
                            <img
                                src={product.photo}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                            {product.discount && (
                                <span className="absolute top-4 left-4 bg-danger text-white px-3 py-1 rounded-lg text-xs font-bold">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>


                        {showZoom && (
                            <div
                                className="hidden absolute right-0 lg:block w-1/2 aspect-square rounded-2xl border bg-bg-secondary"
                                style={{
                                    backgroundImage: `url(${product.photo})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "220%",
                                    backgroundPosition: bgPos,
                                }}
                            />
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">


                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star size={14} className="fill-current" />
                                <span className="text-sm font-bold">{product.rating}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-black dark:text-white mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-3xl font-black text-accent">
                                ${product.price}
                            </span>
                            {product.oldPrice && (
                                <span className="text-lg line-through text-text-muted">
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-text-muted leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-3 border rounded-xl">
                                <Truck size={20} className="text-accent" />
                                <span className="text-xs font-bold text-black dark:text-white">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-xl">
                                <ShieldCheck size={20} className="text-accent" />
                                <span className="text-xs font-bold text-black dark:text-white">Secure Payment</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent-hover transition">
                                <Zap size={18} />
                                Buy Now
                            </button>


                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-accent text-accent rounded-xl font-bold hover:bg-accent hover:text-white transition">
                                <ShoppingCart size={18} />
                                Add to Cart
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!user) {
                                        return toast.error("Please login first!");
                                    }
                                    handleWhislist(product);
                                }}
                                className="p-4 border text-black dark:text-white rounded-xl hover:text-danger transition">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ProductDescrip;