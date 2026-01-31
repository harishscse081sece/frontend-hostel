const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    floor: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        default: 2
    },
    occupied: {
        type: Number,
        default: 0
    },
    residents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    facilities: [{
        type: String,
        enum: ['Wi-Fi', 'AC', 'Study Table', 'Wardrobe', 'Bathroom', 'Balcony']
    }],
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    rent: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);