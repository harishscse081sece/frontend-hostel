import React from 'react';

const HomePage = ({ changePage }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">
                    Smart Hostel Management
                </h1>
                <p className="text-gray-600 mb-8">
                    Manage your hostel life efficiently
                </p>
                <button 
                    onClick={() => changePage('login')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default HomePage;
