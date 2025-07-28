import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
    <>
        <Navbar />
        <main style={{ minHeight: "75vh" }}>
            <Outlet />
        </main>
        <Footer />
    </>
);

export default Layout;
