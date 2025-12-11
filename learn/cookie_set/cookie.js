// npm install express cookie-parser jsonwebtoken

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'your_super_secret_key'; // In production, use .env

// 1. Initialize cookie-parser middleware
app.use(cookieParser());
app.use(express.json());

// --- ROUTES ---

// 2. Login Route: Creates the cookie
app.post('/login', (req, res) => {
    const { username } = req.body;

    // (Assume we validated the user's password here)

    // Create a token (payload can be user ID, role, etc.)
    const token = jwt.sign({ username: username, role: 'user' }, SECRET_KEY);

    // Set the cookie
    // httpOnly: true -> prevents client-side JS from reading the cookie
    // secure: true -> ensures cookie is only sent over HTTPS (use in production)
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000 // 1 hour
    });

    res.send('Logged in successfully! Cookie set.');
});

// 3. Logout Route: Clears the cookie
app.post('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.send('Logged out successfully.');
});


const requireAuth = (req, res, next) => {
    // 1. Read the token from the cookie
    const token = req.cookies.auth_token;

    // 2. Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // 4. Attach user info to request object so next routes can use it
        req.user = decoded; 
        
        // 5. Proceed to the next middleware/route
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

// --- PROTECTED ROUTES ---

// Usage of the middleware
app.get('/dashboard', requireAuth, (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});

app.listen(3000, () => console.log('Server running on port 3000'));