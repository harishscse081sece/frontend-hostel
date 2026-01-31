import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import Footer from '../Footer';

const AdminDashboard = ({ changePage }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Header title="Admin Dashboard" />
            
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">Manage Menu</h3>
                        <p className="text-gray-600 mb-4">Update mess menu</p>
                        <button 
                            onClick={() => changePage('menu-manager')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Update Menu
                        </button>
                    </div>
                    
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">All Complaints</h3>
                        <p className="text-gray-600 mb-4">View and manage complaints</p>
                        <button 
                            onClick={() => changePage('all-complaints')}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            View Complaints
                        </button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default AdminDashboard;
