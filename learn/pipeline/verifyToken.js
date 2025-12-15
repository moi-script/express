import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).send('You have no ticket');

    try {
        const verified = jwt.verify(token, "SECRET");
        req.user = verified;

        next();

    } catch(err) {
        res.status(403).send('Not valid ticket');
    }
}

// example 

router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ msg: `Welcome back user ${req.user.id}` });
});
