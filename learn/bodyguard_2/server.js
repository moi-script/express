import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import chalk from 'chalk';
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());

const key = 'hello-123';
const upload = multer();
// from db

const user = [
    {id : 1, username : "John Maldita", email : 'hello@gmail.com'}
]

const validate = (req, res, next) => {
    const { username, email } = req.body;

    const person = user.find(person => person.username === username && person.email === email)
    if(person) {

        const token = jwt.sign({id : person.id, username : person.username }, key);
        req.token = token;
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
        status : 'error',
        message : err.message || 'There was something wrong in the authentication'
    })
}


const authenticateToken = (req, res, next) => {
    // Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, key, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        console.log(chalk.green('Hehe boy :)'));

        res.sendStatus(200, {
            status : 'Accepted',
            message : 'Goods na'
        } )

        // next(); // -> next to redirect();
    
    })
}
app.get('/authenticate', authenticateToken);

app.post('/login', upload.none(),  validate, (req, res) => {
    const { token } = req;

    res.json({ token: token });
})
app.post('/login', authErrorHandler);

app.listen(5555, () => console.log('running at localhost:5555'));





