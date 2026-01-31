import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Header from '../Header';

const MessMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await fetch('http://localhost:3000/menu');
            const data = await response.json();
            setMenu(data.menu || []);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Header title="Mess Menu" />
            
            <div className="p-6">
                {menu.length > 0 ? (
                    menu.map((day) => (
                        <div key={day._id} className="bg-white p-4 mb-4 rounded shadow">
                            <h3 className="text-lg font-bold text-blue-600 mb-2">{day.day}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h4 className="font-bold">Breakfast</h4>
                                    <p>{day.breakfast}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold">Lunch</h4>
                                    <p>{day.lunch}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold">Dinner</h4>
                                    <p>{day.dinner}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No menu available</p>
                )}
            </div>
        </div>
    );
};

export default MessMenu;
