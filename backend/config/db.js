const mongoose = require('mongoose');

async function connectDB() {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri && process.env.MONGO_USER && process.env.MONGO_PASS && process.env.MONGO_HOST && process.env.MONGO_DB) {
        const user = encodeURIComponent(process.env.MONGO_USER);
        const pass = encodeURIComponent(process.env.MONGO_PASS);
        const host = process.env.MONGO_HOST;
        const db = process.env.MONGO_DB;
        mongoUri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;
    }

    if (!mongoUri) {
        console.error('MongoDB connection error: MONGODB_URI is not set. Please set it in your .env file.');
        process.exit(1);
    }

    const maskedUri = mongoUri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:*****@');
    console.log('Attempting MongoDB connection using:', maskedUri);

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        if (err.message && /Authentication failed|bad auth/i.test(err.message)) {
            console.error('Authentication failed — check your DB username/password, ensure the user exists and has access to the target database. If using MongoDB Atlas, also verify the IP access list and whether the user was created on the correct authentication database (authSource).');
        }
        process.exit(1);
    }
}

module.exports = connectDB;
