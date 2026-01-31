import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import Header from '../Header';

const MenuManager = () => {
    const [day, setDay] = useState('');
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const token = localStorage.getItem('token');
        
        // DEBUG: Check token
        console.log('Token exists:', !!token);
        console.log('Token value:', token);
        
        if (!token) {
            toast.error('No token found. Please login again.');
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/menu/${day}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ breakfast, lunch, dinner })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success('Menu updated successfully!');
                // Clear form
                setDay('');
                setBreakfast('');
                setLunch('');
                setDinner('');
            } else {
                toast.error('Error: ' + data.error);
            }
        } catch (error) {
            toast.error('Error updating menu: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <Header title="Update Menu" />
            
            <div className="p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Day</label>
                        <select 
                            value={day} 
                            onChange={(e) => setDay(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Breakfast</label>
                        <input 
                            type="text"
                            value={breakfast}
                            onChange={(e) => setBreakfast(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter breakfast menu"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Lunch</label>
                        <input 
                            type="text"
                            value={lunch}
                            onChange={(e) => setLunch(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter lunch menu"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Dinner</label>
                        <input 
                            type="text"
                            value={dinner}
                            onChange={(e) => setDinner(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter dinner menu"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Menu'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MenuManager;