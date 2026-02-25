import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import './Layout.css';

const Layout: React.FC = () => {
    return (
        <div className="app-layout">
            <main className="main-content animate-fade-in">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
