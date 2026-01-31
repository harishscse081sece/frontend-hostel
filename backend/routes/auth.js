const express = require('express');
const { studentUser, adminUser, adminLogin } = require('../Controller/authController');
const router = express.Router();

// Middleware for parsing JSON
router.use(express.json());

// Auth routes
// Register admin
router.post('/admin', adminUser);
// Admin login
router.post('/admin/login', adminLogin);
// Student login
router.post('/student', studentUser);

module.exports = router;