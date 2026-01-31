require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const createDB = require("./config/db");
const authRouter = require("./routes/auth");
const authmiddleware = require("./middlewares/authmiddleware");
const User = require("./models/user");
const menuRouter = require("./routes/menu");
const complaintsRouter = require("./routes/complaint");

(async function start() {
    // Connect to DB first. If it fails, the app will exit from connectDB()
    await createDB();

    const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:5174'];
    app.use(cors({
        origin: allowedOrigins,
        credentials: true
    }));

    app.use(express.json());

    app.use("/auth", authRouter);
    app.use("/menu", menuRouter);
    app.use("/complaints", complaintsRouter);

    app.get("/profile", authmiddleware, async (req, res) => {
        const user = await User.findById(req.userData.id).select('-password');
        res.status(200).json({ userData: user });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})();

