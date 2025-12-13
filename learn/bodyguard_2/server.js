import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import { initHome, homeError } from './middleware.js';
const app = express();


// thirparty 
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser())

const key = 'hello-123';
const upload = multer();
// from db

const user = [
    { id: 1, username: "John Maldita", email: 'hello@gmail.com' }
]

const validate = (req, res, next) => {
    const { username, email } = req.body;

    const person = user.find(person => person.username === username && person.email === email)
    if (person) {

        const token = jwt.sign({ id: person.id, username: person.username }, key, { expiresIn: '1m' });
        req.token = token;

        res.cookie('token', token, {
            httpOnly: true, // Critical: JS cannot read this
            secure: false,   // Critical: Only send over HTTPS
            maxAge: 10000   // 10 seconds
        });
        console.log('ewrr')

        return next();
    }

    const error = new Error('User not found');
    error.sendStatus = 401;
    next(error);
}

const authErrorHandler = (err, req, res, next) => {
    console.error('Erorr :: ', err);

    const status = err.statusCode || 500;

    res.status(status).json({
        status: 'error',
        message: err.message || 'There was something wrong in the authentication'
    })
}


const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.sendStatus(401);

        jwt.verify(token, key, (err, user) => {
            if (err) return res.sendStatus(403);

            req.user = user;
            console.log(chalk.green('Hehe boy :)'));

            // res.sendStatus(200, {
            //     status: 'Accepted',
            //     message: 'Goods na'
            // })
            res.redirect('/home'); // default 302

            // next(); // -> next to redirect();
        })
    } catch (err) {
        console.error('Error  ', err);
    }


}
app.get('/authenticate', authenticateToken);

app.post('/login', upload.none(), validate, (req, res) => {
    // const { token } = req;
    console.log('Logging in');
    res.redirect('/home');
});


app.post('/sign_in', (req, res) => {
    const person = req.body;
        const token = jwt.sign({ id: person.id, username: person.username }, key, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: person.id, username: person.username }, key, { expiresIn: '7d' });

        res.cookie('accessToken', token, {
            httpOnly : true,
            maxAge : 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            maxAge : 7 * 24 * 60 * 60 * 1000
        });
        
        res.send('Logged in');

})






app.get('/home', initHome, (req, res) => {
    console.log('Test')
    // console.log('Home test', home);
    console.log('Result ::', req.home);
    res.send(req.home);
})


app.use(authErrorHandler);
app.use(homeError);






app.listen(5555, () => console.log('running at localhost:5555'));





