import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import Header from '../Header';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setUser(data.userData);
        } catch (error) {
            toast.error('Failed to load profile');
        }
    };

    return (
        <div>
            <Navbar />
            <Header title="My Profile" />
            
            <div className="p-6 max-w-md mx-auto">
                <div className="bg-white p-6 rounded shadow">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-gray-600 capitalize">{user?.role}</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Email</label>
                            <p className="mt-1 p-2 bg-gray-100 rounded">{user?.email}</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Role</label>
                            <p className="mt-1 p-2 bg-gray-100 rounded capitalize">{user?.role}</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Member Since</label>
                            <p className="mt-1 p-2 bg-gray-100 rounded">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;