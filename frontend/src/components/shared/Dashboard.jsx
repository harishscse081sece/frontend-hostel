import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';

const Dashboard = () => {
    // Mock dashboard data - you can connect to backend later
    const stats = {
        totalComplaints: 12,
        pendingComplaints: 3,
        solvedComplaints: 9,
        menuItems: 21,
        lastLogin: "2 hours ago",
        roomStatus: "Occupied"
    };

    const recentActivity = [
        { action: "Complaint submitted", time: "2 hours ago", type: "complaint" },
        { action: "Menu updated", time: "1 day ago", type: "menu" },
        { action: "Profile updated", time: "3 days ago", type: "profile" }
    ];

    return (
        <div>
            <Navbar />
            <Header title="Dashboard" />
            
            <div className="p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                    <p>Last login: {stats.lastLogin}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.totalComplaints}</div>
                        <div className="text-sm text-gray-600">Total Complaints</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded shadow text-center">
                        <div className="text-2xl font-bold text-yellow-600">{stats.pendingComplaints}</div>
                        <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded shadow text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.solvedComplaints}</div>
                        <div className="text-sm text-gray-600">Solved</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded shadow text-center">
                        <div className="text-2xl font-bold text-purple-600">{stats.menuItems}</div>
                        <div className="text-sm text-gray-600">Menu Items</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded shadow mb-6">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
                            📝 New Complaint
                        </button>
                        <button className="bg-green-500 text-white p-3 rounded hover:bg-green-600">
                            📋 View Menu
                        </button>
                        <button className="bg-purple-500 text-white p-3 rounded hover:bg-purple-600">
                            👤 My Profile
                        </button>
                        <button className="bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600">
                            💰 Fee Status
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 border-l-4 border-blue-500">
                                <div className={`w-3 h-3 rounded-full ${
                                    activity.type === 'complaint' ? 'bg-red-500' :
                                    activity.type === 'menu' ? 'bg-green-500' : 'bg-blue-500'
                                }`}></div>
                                <div className="flex-1">
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-gray-600">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;