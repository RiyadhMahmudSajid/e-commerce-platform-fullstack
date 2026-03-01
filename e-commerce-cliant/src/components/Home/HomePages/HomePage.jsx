import React from 'react';

import Hero from '../HomeComponents/Hero';
import Categories from '../HomeComponents/Categories';
import FeaturedProducts from '../HomeComponents/FeaturedProducts';
import Mibbanner from '../HomeComponents/Mibbanner';
import Offers from '../HomeComponents/Offer';
import TrustSignals from '../HomeComponents/TrustSignal';
import useDocumentTitle from '../../../hooks/useDocumentTitle';


const HomePage = () => {
     useDocumentTitle("Home | YourShop");
    return (
        <div>
           <Hero></Hero>
           <Categories></Categories>
           <FeaturedProducts></FeaturedProducts>
           <Mibbanner></Mibbanner>
           <Offers></Offers>
           <TrustSignals></TrustSignals>
        </div>
    );
};

export default HomePage;