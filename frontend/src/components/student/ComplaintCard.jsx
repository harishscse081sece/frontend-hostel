import React from 'react';

const ComplaintCard = ({ complaint }) => {
    const statusColor = complaint.status === 'Solved' ? 'text-green-600' : 'text-yellow-600';
    
    return (
        <div className="bg-white p-4 mb-4 rounded shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg">{complaint.type}</h3>
                    <p className="text-gray-600 mt-2">{complaint.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span className={`font-bold ${statusColor}`}>
                    {complaint.status}
                </span>
            </div>
        </div>
    );
};

export default ComplaintCard;
