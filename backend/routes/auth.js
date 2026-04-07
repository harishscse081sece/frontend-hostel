const express = require('express');
const { studentUser, adminUser } = require('../Controller/authController');
const router = express.Router();

// Middleware for parsing JSON
router.use(express.json());

// Auth routes
router.post('/admin', adminUser);
router.post('/student', studentUser);

module.exports = router;