// src/components/layout/Layout.jsx
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <>
        <Header />
        <main className="container mx-auto"><Outlet /></main>
        <Footer />
    </>
);

export default Layout;
