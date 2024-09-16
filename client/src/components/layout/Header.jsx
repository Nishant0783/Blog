import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import avatar from '/avatar.jpg';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Mock user authentication state
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear auth token
        toast.success('Logged out successfully');
        navigate('/');
    };

    useEffect(() => {
        // Function to handle clicks outside the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-blue-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl font-bold">VBlog</h1>
                    <nav className="hidden md:flex space-x-4">
                        <Link to="/" className="hover:text-blue-200 transition-colors">
                            Home
                        </Link>
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center focus:outline-none"
                                >
                                    <img
                                        src={avatar}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-black"
                                    >
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm hover:bg-blue-100"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-200 transition-colors">
                                    Login
                                </Link>
                                <Link to="/signup" className="hover:text-blue-200 transition-colors">
                                    Signup
                                </Link>
                            </>
                        )}
                    </nav>
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <nav className="px-2 pt-2 pb-4 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                        >
                            Home
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
