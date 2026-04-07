const Complaint = require('../models/Complaint');

const getComplaints = async (req, res) => {
    try {
        const { role, id } = req.userData;
        
        let complaints;
        if (role === 'admin') {
            complaints = await Complaint.find();
        } else {
            complaints = await Complaint.find({ studentId: id });
        }
        
        res.status(200).json({ message: "Complaints fetched", complaints });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createComplaint = async (req, res) => {
    try {
        const { type, description } = req.body;
        const { id, email } = req.userData;
        
        const complaint = await Complaint.create({
            studentId: id,
            studentName: email,
            type,
            description
        });
        
        res.status(201).json({ message: "Complaint created", complaint });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const { role } = req.userData;
        
        if (role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }
        
        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        
        res.status(200).json({ message: "Complaint updated", complaint });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getComplaints, createComplaint, updateComplaintStatus };
