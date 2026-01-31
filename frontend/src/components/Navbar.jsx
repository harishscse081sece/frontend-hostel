import React from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');
    const token = getToken();

    let userName = '';
    try {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userName = payload?.name || '';
        }
    } catch (e) {
        const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (stored) {
            userName = JSON.parse(stored).name || '';
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        toast.success('Logged out successfully!');
        window.location.reload(); // Reload to go back to home
    };

    const handleBack = () => {
        window.location.reload(); // Go back to dashboard
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Smart Hostel Management</h1>
                    {userName && <div className="text-sm bg-blue-500 px-3 py-1 rounded">Hello, {userName}</div>}
                </div>

                <div className="flex space-x-4">
                    <button 
                        onClick={handleBack}
                        className="hover:text-blue-200"
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
