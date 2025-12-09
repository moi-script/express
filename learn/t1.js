import chalk from "chalk";
import express from "express";
// import {createReadStream} from  'fs';
import fs from 'fs';
const app = express();


const toUpper = (req, res, next) => {
    let body = '';
    const readStr = fs.createReadStream('notes.txt');

    readStr.on('data', ch => {
        body += ch.toString();
    })
    readStr.on('end', () => {
        req.newData = body.toUpperCase();
        next();
    })
}
 // local 
app.get('/', toUpper, (req, res) => {
    res.status(200).send(req.newData);

})


// global
app.use('/getFile', (req, res) => {
    console.log(chalk.green('Get file was trigged'));
    res.send(fs.readFileSync('notes.txt'));

})

app.use('/getFile/test', (req, res) => {
    res.send(fs.readFileSync('notes.txt'));
})



app.listen(3000, () => console.log('Running at localhost:3000'));