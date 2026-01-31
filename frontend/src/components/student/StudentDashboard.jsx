import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import Footer from '../Footer';

const StudentDashboard = ({ changePage }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Header title="Student Dashboard" />
            
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Dashboard Overview */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">📊 Dashboard</h3>
                        <p className="mb-4">View your overview & stats</p>
                        <button 
                            onClick={() => changePage('dashboard')}
                            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
                        >
                            View Dashboard
                        </button>
                    </div>

                    {/* Profile */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">👤 My Profile</h3>
                        <p className="text-gray-600 mb-4">View & edit your profile</p>
                        <button 
                            onClick={() => changePage('profile')}
                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                        >
                            View Profile
                        </button>
                    </div>

                    {/* Menu */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">📋 Mess Menu</h3>
                        <p className="text-gray-600 mb-4">Check today's meals</p>
                        <button 
                            onClick={() => changePage('menu')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            View Menu
                        </button>
                    </div>

                    {/* Complaints */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">📝 Complaints</h3>
                        <p className="text-gray-600 mb-4">Raise or view complaints</p>
                        <div className="space-x-2">
                            <button 
                                onClick={() => changePage('complaint-form')}
                                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
                            >
                                New
                            </button>
                            <button 
                                onClick={() => changePage('complaint-list')}
                                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
                            >
                                View
                            </button>
                        </div>
                    </div>

                    {/* Room Info */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">🏠 Room Info</h3>
                        <p className="text-gray-600 mb-4">View room details</p>
                        <button 
                            onClick={() => changePage('room-info')}
                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                        >
                            View Room
                        </button>
                    </div>

                    {/* Fee Management */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">💰 Fee Status</h3>
                        <p className="text-gray-600 mb-4">Check payment status</p>
                        <button 
                            onClick={() => changePage('fee-management')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            View Fees
                        </button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default StudentDashboard;
