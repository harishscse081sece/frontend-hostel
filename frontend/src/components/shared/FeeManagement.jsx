import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';

const FeeManagement = () => {
    // Mock fee data - you can connect to backend later
    const feeData = {
        monthlyFee: 5000,
        paidAmount: 5000,
        dueAmount: 0,
        lastPayment: "2024-01-15",
        status: "Paid",
        paymentHistory: [
            { month: "January 2024", amount: 5000, date: "2024-01-15", status: "Paid" },
            { month: "December 2023", amount: 5000, date: "2023-12-15", status: "Paid" },
            { month: "November 2023", amount: 5000, date: "2023-11-15", status: "Paid" }
        ]
    };

    return (
        <div>
            <Navbar />
            <Header title="Fee Management" />
            
            <div className="p-6 max-w-md mx-auto">
                {/* Current Status */}
                <div className="bg-white p-6 rounded shadow mb-6">
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                            💰
                        </div>
                        <h2 className="text-xl font-bold">Fee Status</h2>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="font-bold">Monthly Fee:</span>
                            <span>₹{feeData.monthlyFee}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Paid Amount:</span>
                            <span className="text-green-600">₹{feeData.paidAmount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Due Amount:</span>
                            <span className={feeData.dueAmount > 0 ? "text-red-600" : "text-green-600"}>
                                ₹{feeData.dueAmount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Status:</span>
                            <span className={`px-2 py-1 rounded text-sm ${
                                feeData.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {feeData.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment History */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Payment History</h3>
                    <div className="space-y-3">
                        {feeData.paymentHistory.map((payment, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{payment.month}</p>
                                        <p className="text-sm text-gray-600">{payment.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">₹{payment.amount}</p>
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeManagement;