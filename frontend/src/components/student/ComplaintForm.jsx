import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import Header from '../Header';

const ComplaintForm = () => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:3000/complaints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type, description })
            });
            
            if (response.ok) {
                toast.success('Complaint submitted successfully!');
                setType('');
                setDescription('');
            } else {
                const data = await response.json();
                toast.error('Error: ' + (data.error || 'Failed to submit complaint'));
            }
        } catch (error) {
            toast.error('Error submitting complaint: ' + error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <Header title="New Complaint" />
            
            <div className="p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Complaint Type</label>
                        <select 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Food">Food</option>
                            <option value="Water">Water</option>
                            <option value="Wi-Fi">Wi-Fi</option>
                            <option value="Room">Room</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Description</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Submit Complaint
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComplaintForm;
