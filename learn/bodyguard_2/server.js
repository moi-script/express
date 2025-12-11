import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import multer from 'multer';
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(multer());


const key = 'hello-123';
const upload = multer();
// from db

const user = [
    {id : 1, username : "John Maldita", email : 'hello@gmail.com'}
]



const validate = (req, res, next, error) => {
    const { username, email } = req.body;

    const userExist = user.find(person => person.username === username && person.email === email)
    if(userExist) {

        const token = jwt.sign({id : user.id, username : user.username }, key);
        res.token = token;
        next();
    }
    return next(error);
}

const authErrorHandler = (err, req, res, next) => {
    console.error('Erorr :: ', err);

    const status = err.statusCode || 500;

    res.status(status).json({
        status : 'error',
        message : 'There was something wrong in the authentication'
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
        next(); // -> next to redirect();
    
    })
}



app.post('/login', upload.none(),  validate, (req, res) => {
    const { token } = res;

    res.json({ token: token });
})

app.post('/login', authErrorHandler);

app.post('/authenticate', authenticateToken);