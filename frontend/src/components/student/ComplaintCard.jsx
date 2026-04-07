import React from 'react';

const ComplaintCard = ({ complaint }) => {
    const getStatusBadge = () => {
        const status = complaint.status || 'Pending';
        
        if (status === 'Solved') {
            return (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    ✓ Solved
                </span>
            );
        }
        return (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                ⏳ Pending
            </span>
        );
    };
    
    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{complaint.type}</h3>
                        {getStatusBadge()}
                    </div>
                    <p className="text-gray-600 mt-2 leading-relaxed">{complaint.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                        <p className="text-sm text-gray-500">
                            📅 {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-sm text-gray-500">
                            🕐 {new Date(complaint.createdAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintCard;
