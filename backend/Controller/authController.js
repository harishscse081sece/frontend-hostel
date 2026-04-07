const users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminUser = async (req, res) => {
    try {
        const { email, password, name, phone, role } = req.body;
        
        const existingUser = await users.findOne({ $or: [{ email }, { phone }] });
        if(existingUser) {
            if(existingUser.email === email) {
                return res.status(409).json({ error: "Email already exists" });
            }
            if(existingUser.phone === phone) {
                return res.status(409).json({ error: "Phone number already exists" });
            }
        }
        
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(phone)) {
            return res.status(400).json({ error: "Phone number must be 10 digits" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({email, password: hashedPassword, name, phone, role: role || 'student'});
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const studentUser = async (req, res) => {  
    try {
        const { email, password, phone, role } = req.body;
        console.log('Login attempt:', { email, phone, role });
        
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(phone)) {
            return res.status(400).json({ error: "Phone number must be 10 digits" });
        }
        
        const user = await users.findOne({ email, phone });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if(!user) {
            return res.status(400).json({ error: "Invalid email, phone, or password" });
        }
        
        if(role && user.role !== role) {
            return res.status(403).json({ error: `This account is registered as ${user.role}, not ${role}` });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);
        
        if(!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }
        
        const token = jwt.sign({id: user._id, email: user.email, role: user.role, name: user.name, phone: user.phone}, process.env.SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({message: "Login successful", token});
    } catch (err) {
        console.log('Login error:', err.message);
        res.status(400).json({ error: err.message });
    }   
}

module.exports = { adminUser, studentUser };