import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jsonwebtoken from 'jsonwebtoken';
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());



const key = 'hello-123';

// from db

const user = [
    {id : 1, username : "John Maldita", email : 'hello@gmail.com'}
]



const validate = (req, res, next, error) => {
    const { username, email } = req.body;

    const userExist = user.find(person => person.username === username && person.email === email)
    if(userExist) {
        next()
    }
    return next(error);
}

const authErrorHanlder = (err, req, res, next) => {
    console.error('Erorr :: ', err);

    const status = err.statusCode || 500;

    res.status(status).json({
        status : 'error',
        message : 'There was something wrong in the authentication'
    })
}



app.post('/login', validate, (req, res) => {
})

app.post('/login', authErrorHanlder);
