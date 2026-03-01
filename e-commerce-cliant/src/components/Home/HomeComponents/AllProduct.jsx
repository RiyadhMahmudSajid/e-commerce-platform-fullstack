import { Star, ShoppingCart, Heart } from 'lucide-react';
import useProduct from '../../../hooks/useProduct';
import Loading from '../../loading/Loading';
import { useContext,  useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useWhislist from '../../../hooks/useWhislist';
import { motion } from 'motion/react';
import { AuthContex } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { CartContext } from '../../../providers/CartProvider';

const AllProducts = () => {

    const { isLoading, products } = useProduct()
    const { user } = useContext(AuthContex)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const { handleWhislist } = useWhislist()
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const navigate = useNavigate()
    const {addToCart} = useContext(CartContext)
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pags = [...Array(totalPages).keys()].map(p => p + 1);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="py-16 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03 }}
                            className="cursor-pointer"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            <div className="group bg-bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative overflow-hidden aspect-square">
                                    <img
                                        src={product.photo}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {product.discount && (
                                        <span className="absolute top-3 left-3 bg-danger text-white px-3 py-1 rounded-full text-xs font-black">
                                            -{product.discount}%
                                        </span>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); if (!user) {
                                                return toast.error("Please login first!");
                                            } handleWhislist(product);
                                        }}
                                        className="absolute top-3 right-3 p-2 bg-bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-soft">
                                        <Heart className="w-5 h-5 text-text-muted hover:text-danger transition-colors" />
                                    </button>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-semibold text-lg text-text-main mb-2 line-clamp-1">
                                        {product.name}
                                    </h3>

                                    <p className="text-sm text-text-muted mb-3">
                                        {product.description?.split(' ').slice(0, 5).join(' ')}
                                        {product.description?.split(' ').length > 5 && ' ...'}
                                    </p>

                                    <div className="flex items-center mb-3">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="ml-2 text-sm text-text-muted">
                                            {product.rating}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-text-main">
                                                    ${product.price}
                                                </span>
                                                {product.oldPrice && (
                                                    <span className="text-sm text-text-muted line-through">
                                                        ${product.oldPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product)}}
                                            className="p-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-md shadow-accent/20">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2 mt-10 select-none">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={`px-4 py-2 rounded-lg border border-black dark:border-white text-sm text-black dark:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-white'}`}
                    >
                        Prev
                    </button>

                    {pags.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg border text-black dark:text-white text-sm transition ${currentPage === page ? 'bg-accent text-white' : 'hover:bg-accent-soft'}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={`px-4 py-2 rounded-lg border border-black dark:border-white  text-black dark:text-white text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-white'}`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </section>
    );
};

export default AllProducts;
