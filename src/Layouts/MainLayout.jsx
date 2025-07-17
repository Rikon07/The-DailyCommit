import React from 'react';
import { Outlet } from 'react-router';
import Navbar from "../Components/Home Components/Navbar";
import Footer from '../Components/Home Components/Footer';
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;