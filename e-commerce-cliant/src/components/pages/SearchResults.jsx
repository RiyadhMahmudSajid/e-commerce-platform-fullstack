import React from 'react';
import useProduct from '../../hooks/useProduct';
import { useSearchParams } from 'react-router';
import Loading from '../loading/Loading';
import { Star, ShoppingCart, Heart } from 'lucide-react';
const SearchResults = () => {
    const { products, isLoading } = useProduct();
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query") || "";
    if (isLoading) {
        return <Loading></Loading>
    }
    const matchedProducts = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))

    

    return (
        <section className="py-16 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {matchedProducts.map((product) => (
                        <div
                            key={product._id}
                            className="group bg-bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src={product.photo}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {product.discount && (
                                    <span className="absolute top-3 left-3 bg-danger text-white px-3 py-1 rounded-full text-xs font-black">
                                        -{product.discount}
                                    </span>
                                )}

                                <button className="absolute top-3 right-3 p-2 bg-bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-soft">
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

                                    <button className="p-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-md shadow-accent/20">
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default SearchResults;