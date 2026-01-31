const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    meals: {
        breakfast: {
            attended: { type: Boolean, default: false },
            time: { type: Date }
        },
        lunch: {
            attended: { type: Boolean, default: false },
            time: { type: Date }
        },
        dinner: {
            attended: { type: Boolean, default: false },
            time: { type: Date }
        }
    },
    totalMeals: {
        type: Number,
        default: 0
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);