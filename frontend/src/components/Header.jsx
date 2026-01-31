import React from 'react';

const Header = ({ title }) => {
    return (
        <div className="bg-blue-600 text-white p-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
        </div>
    );
};

export default Header;
