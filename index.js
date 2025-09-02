
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import connectDB from './db.js';



const app = express();
app.use(cookieParser());
app.use(express.json());




const jwtAccessToken = 'secretAccess';
const jwtRefreshToken = 'secretRefresh';

function signInToken(payload) {
    return jwt.sign(payload, jwtAccessToken, { expiresIn: '15s' });
}

function refreshToken(payload) {
    return jwt.sign(payload, jwtRefreshToken, { expiresIn: '7d' });
}



function auth(req, res, next) {

    const auth = req.headers.authorization || "";
    const token = (auth.startsWith("Bearer ") ? auth.slice(7) : null);
    console.log('Token after header :: ', token);
    if (!token) return res.status(401).json({ status: 'Unauthorized', message: 'Error Missing Token' });

    try {
        req.user = jwt.verify(token, jwtAccessToken);
        return next();
    } catch (err) {
        console.log('Error :', err);
        res.status(401).json({ status: 'Unauthorized', message: 'Error Wrong Token' });
    }
}



app.post('/login', (req, res) => {
    const { name, password } = req.body;

    if (name !== 'John Moises' || password !== 'hello secret') {
        return res.status(401).json({ status: 'Unauthorized', message: 'Invalid Credentials' })
    }

    const userPayload = { sub: 'for cookies', name };

    const accessToken = signInToken(userPayload);
    const refToken = refreshToken(userPayload);

    console.log('Refresh token created :: ', chalk.blue(refToken))
    try {
        res.cookie('refreshToken', refToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 * 1000,
            path: '/refresh'
        });
        return res.status(200).json({ status: 'ok', accessToken });

    } catch (err) {
        return res.status(400).json({ status: 'Bad Request', message: 'cookie set failed' })
    }

})


app.post('/refresh', (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ status: 'Unauthorize', message: 'Missing Token' });

    try {
        const payload = jwt.verify(token, jwtRefreshToken);

        const newAccessToken = signInToken({ sub: payload.sub, name: payload.name });
        const newRefreshToken = refreshToken({ sub: payload.sub, name: payload.name });
        console.log('Test');
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 * 1000,
            path: '/refresh'
        })
        console.log('Test');


        //  should be sent in db
        return res.json({ accessToken: newAccessToken })
    } catch (err) {
        return res.status(401).json({ error: 'Invalid refresh token' });

    }

})

app.post('/logout', (req, res) => {
    res.clearCookie('refreshToken', { path: '/refresh' });
    res.json({ status: 'ok' });
})



app.get('/test', (req, res) => {
    console.log(chalk.red('Test ===='));
} )

app.get('/profile', auth, (req, res) => {
    res.json({ status: 'ok', user: req.user })
})

app.listen(1000, () => console.log('listening at http://localhost:1000'));