const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    messFee: {
        type: Number,
        required: true,
        default: 5000
    },
    roomRent: {
        type: Number,
        required: true,
        default: 3000
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        default: 0
    },
    dueAmount: {
        type: Number,
        default: 0
    },
    paymentDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Online', 'Card', 'UPI']
    },
    transactionId: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Fee', feeSchema);