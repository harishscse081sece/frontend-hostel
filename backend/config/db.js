// Import mongoose library
// Mongoose is used to connect Node.js with MongoDB
const mongoose = require('mongoose');
// async is used because database connection takes time
async function connectDB() {
    // Build or validate the MongoDB connection string
    let mongoUri = process.env.MONGODB_URI;

    // Support building the URI from separate env vars if present
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

    // Mask the password when logging to avoid leaking secrets
    const maskedUri = mongoUri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:*****@');
    console.log('Attempting MongoDB connection using:', maskedUri);

    try {
        // Connect to MongoDB using connection string from environment variables
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        // Provide actionable hints for authentication failures
        if (err.message && /Authentication failed|bad auth/i.test(err.message)) {
            console.error('Authentication failed — check your DB username/password, ensure the user exists and has access to the target database. If using MongoDB Atlas, also verify the IP access list and whether the user was created on the correct authentication database (authSource).');
        }
        // Exit with non-zero code to indicate failure
        process.exit(1);
    }
}

module.exports = connectDB; // Export the function so it can be used in server.js

// async allows a function to wait
// await pauses the code until a slow task finishes.


// WITHOUT AWAIT 

// Start connection
// Print message immediately
// Connection still running...


// WITH AWAIT

// Start connection
// WAIT until connected
// Print success message
