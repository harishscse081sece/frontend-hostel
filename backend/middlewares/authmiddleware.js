const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        console.log(token);
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        req.userData = {id:decoded.id, email:decoded.email, role:decoded.role};

        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized',message: err.message });
    }
};

module.exports = authMiddleware;