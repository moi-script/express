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