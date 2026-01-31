import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';

const RoomInfo = () => {
    // Mock room data - you can connect to backend later
    const roomData = {
        roomNumber: "A-101",
        floor: "1st Floor",
        capacity: 2,
        occupied: 1,
        roommates: ["John Doe"],
        facilities: ["Wi-Fi", "AC", "Study Table", "Wardrobe"],
        status: "Available"
    };

    return (
        <div>
            <Navbar />
            <Header title="Room Information" />
            
            <div className="p-6 max-w-md mx-auto">
                <div className="bg-white p-6 rounded shadow">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                            🏠
                        </div>
                        <h2 className="text-xl font-bold">Room {roomData.roomNumber}</h2>
                        <p className="text-gray-600">{roomData.floor}</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Capacity</label>
                            <p className="mt-1 p-2 bg-gray-100 rounded">{roomData.occupied}/{roomData.capacity} Occupied</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Roommates</label>
                            <div className="mt-1 p-2 bg-gray-100 rounded">
                                {roomData.roommates.length > 0 ? 
                                    roomData.roommates.map((mate, index) => (
                                        <p key={index}>{mate}</p>
                                    )) : 
                                    <p>No roommates</p>
                                }
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Facilities</label>
                            <div className="mt-1 p-2 bg-gray-100 rounded">
                                {roomData.facilities.map((facility, index) => (
                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Status</label>
                            <p className="mt-1 p-2 bg-green-100 text-green-800 rounded">{roomData.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomInfo;