const users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const adminUser = async (req, res) => {
    try {
        const { email, password, name } = req.body; 
        const existingUser = await users.findOne({email});
        if(existingUser) {
            return  res.status(409).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({email, password: hashedPassword, name});
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const studentUser = async (req, res) => {  
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password }); // DEBUG
        
        const user = await users.findOne({email});
        console.log('User found:', user ? 'Yes' : 'No'); // DEBUG
        
        if(!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        } 
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid); // DEBUG
        
        if(!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }
        
        const token = jwt.sign({id: user._id, email: user.email, role: user.role, name: user.name}, process.env.SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({message: "Login successful", token});
    } catch (err) {
        console.log('Login error:', err.message); // DEBUG
        res.status(400).json({ error: err.message });
    }   
}

// Admin login: authenticate only users with role 'admin'
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Admin login attempt:', { email }); // DEBUG

        const user = await users.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Admin password valid:', isPasswordValid); // DEBUG

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({id: user._id, email: user.email, role: user.role, name: user.name}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});

        // return token and some user info (no password)
        res.status(200).json({ message: "Login successful", token, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
    } catch (err) {
        console.log('Admin login error:', err.message); // DEBUG
        res.status(400).json({ error: err.message });
    }
}

module.exports = { adminUser, studentUser, adminLogin };