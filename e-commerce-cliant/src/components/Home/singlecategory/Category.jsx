import React from 'react';
import useProduct from '../../../hooks/useProduct';
import Loading from '../../loading/Loading';
import { useParams } from 'react-router';
import ShowCategory from './ShowCategory';

const Category = () => {

    const { isLoading: prodLoading, products } = useProduct();

    if (prodLoading) return <Loading />;


    const { category } = useParams();


    const filterCategories = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
 

    return (
        <div className='py-16 bg-background transition-colors duration-300'>

            <div className='max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                {
                    filterCategories.map((filterCategorie) => <ShowCategory key={filterCategorie._id} filterCategorie={filterCategorie}></ShowCategory>)

                }

            </div>
        </div>
    );
};

export default Category;