const express = require('express');
const router = express.Router();
const { getComplaints, createComplaint, updateComplaintStatus } = require('../Controller/complaintController');
const authmiddleware = require('../middlewares/authmiddleware');

router.get('/', authmiddleware, getComplaints);
router.post('/', authmiddleware, createComplaint);
router.put('/:id', authmiddleware, updateComplaintStatus);

module.exports = router;
