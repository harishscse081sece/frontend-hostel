import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import ComplaintCard from './ComplaintCard';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:3000/complaints', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setComplaints(data.complaints || []);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Header title="My Complaints" />
            
            <div className="p-6">
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <ComplaintCard key={complaint._id} complaint={complaint} />
                    ))
                ) : (
                    <p className="text-center">No complaints found</p>
                )}
            </div>
        </div>
    );
};

export default ComplaintList;
