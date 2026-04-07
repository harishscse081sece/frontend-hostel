import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API_URL from '../config/api';

const Signup = ({ changePage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        if (name.length < 3) {
            setError('Name must be at least 3 characters');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!/^[0-9]{10}$/.test(phone)) {
            setError('Phone number must be 10 digits');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            const endpoint = `${API_URL}/auth/admin`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registration failed');
                toast.error(data.error || 'Registration failed');
            } else {
                toast.success('Registration successful! Please login.');
                changePage('login');
            }
        } catch (err) {
            setError(err.message);
            toast.error('Registration failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

                <div className="flex gap-3 justify-center mb-4">
                    <label className={`px-3 py-1 rounded cursor-pointer ${role === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                        <input
                            type="radio"
                            name="role"
                            value="student"
                            checked={role === 'student'}
                            onChange={() => setRole('student')}
                            className="hidden"
                        />
                        Student
                    </label>
                    <label className={`px-3 py-1 rounded cursor-pointer ${role === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                            className="hidden"
                        />
                        Admin
                    </label>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="you@domain.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="9876543210"
                            maxLength="10"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number</p>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-9 text-sm text-gray-500"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Confirm password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-60 flex items-center justify-center mb-4"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Signing up...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => changePage('login')}
                                className="text-blue-500 hover:underline font-medium"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
