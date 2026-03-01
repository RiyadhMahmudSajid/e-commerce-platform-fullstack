import React from 'react';
import Navbar from '../../Home/HomeComponents/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Footer/Footer';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';


const RootLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;