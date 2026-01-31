import React from 'react';

const ComplaintManager = ({ complaint, onUpdate }) => {
    const handleStatusUpdate = async (newStatus) => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:3000/complaints/${complaint._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            
            if (response.ok) {
                alert('Status updated successfully!');
                onUpdate();
            }
        } catch (error) {
            alert('Error updating status');
        }
    };

    const statusColor = complaint.status === 'Solved' ? 'text-green-600' : 'text-yellow-600';

    return (
        <div className="bg-white p-4 mb-4 rounded shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-bold text-lg">{complaint.type}</h3>
                    <p className="text-gray-600 mt-2">{complaint.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Student: {complaint.studentName}
                    </p>
                    <p className="text-sm text-gray-500">
                        Date: {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                </div>
                
                <div className="ml-4">
                    <span className={`font-bold ${statusColor} block mb-2`}>
                        {complaint.status}
                    </span>
                    
                    {complaint.status === 'Pending' && (
                        <button
                            onClick={() => handleStatusUpdate('Solved')}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                            Mark Solved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintManager;
