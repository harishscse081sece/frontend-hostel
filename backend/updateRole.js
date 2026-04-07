require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

async function updateUserRole() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = process.argv[2];
        const newRole = process.argv[3];

        if (!email || !newRole) {
            console.log('Usage: node updateRole.js <email> <role>');
            console.log('Example: node updateRole.js admin@hostel.com admin');
            process.exit(1);
        }

        if (newRole !== 'admin' && newRole !== 'student') {
            console.log('Role must be either "admin" or "student"');
            process.exit(1);
        }

        const user = await User.findOneAndUpdate(
            { email },
            { role: newRole },
            { new: true }
        );

        if (!user) {
            console.log(`User with email ${email} not found`);
        } else {
            console.log(`✅ Updated ${user.name} (${user.email}) to role: ${newRole}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

updateUserRole();
