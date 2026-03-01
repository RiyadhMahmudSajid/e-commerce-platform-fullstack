import React from 'react';
import Navbar from '../../Home/HomeComponents/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Footer/Footer';


const AuthLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayOut;