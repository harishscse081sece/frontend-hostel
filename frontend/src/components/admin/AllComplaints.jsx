import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import ComplaintManager from './ComplaintManager';
import API_URL from '../../config/api';

const AllComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const token = localStorage.getItem('token');
        
        console.log('Fetching complaints...');
        console.log('Token:', token ? 'exists' : 'missing');
        
        try {
            const response = await fetch(`${API_URL}/complaints`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Complaints response:', data);
            console.log('Number of complaints:', data.complaints?.length || 0);
            
            if (data.complaints && data.complaints.length > 0) {
                console.log('First complaint:', data.complaints[0]);
                console.log('First complaint status:', data.complaints[0].status);
            }
            
            setComplaints(data.complaints || []);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Header title="All Complaints" />
            
            <div className="p-6">
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <ComplaintManager 
                            key={complaint._id} 
                            complaint={complaint}
                            onUpdate={fetchComplaints}
                        />
                    ))
                ) : (
                    <p className="text-center">No complaints found</p>
                )}
            </div>
        </div>
    );
};

export default AllComplaints;
