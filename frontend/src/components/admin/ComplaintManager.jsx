import React from 'react';
import { toast } from 'react-toastify';
import API_URL from '../../config/api';

const ComplaintManager = ({ complaint, onUpdate }) => {
    console.log('Rendering ComplaintManager for complaint:', complaint._id);
    console.log('Complaint status:', complaint.status);
    console.log('Should show button:', complaint.status === 'Pending' || !complaint.status);
    
    const handleStatusUpdate = async (newStatus) => {
        const token = localStorage.getItem('token');
        
        console.log('Updating complaint:', complaint._id, 'to status:', newStatus);
        console.log('Token:', token ? 'exists' : 'missing');
        
        if (!token) {
            toast.error('Please login again');
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/complaints/${complaint._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            
            const data = await response.json();
            console.log('Response:', response.status, data);
            
            if (response.ok) {
                toast.success('✅ Complaint marked as solved!');
                onUpdate();
            } else {
                toast.error(data.error || 'Failed to update status');
                console.error('Update failed:', data);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error updating status: ' + error.message);
        }
    };

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
                            👤 {complaint.studentName}
                        </p>
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
                
                <div className="ml-4">
                    {(complaint.status === 'Pending' || !complaint.status) && (
                        <button
                            onClick={() => handleStatusUpdate('Solved')}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
                        >
                            ✓ Mark as Solved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintManager;
