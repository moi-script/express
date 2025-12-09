import express from 'express';

const app = express();
const port = 3000;



app.get('/', (req, res) => {
    res.send('Hell world');
})

app.listen(port, () => {
    console.log('Server is running at http://localhost:3000');
})



// routing core 

// app.get('/users');
// app.post('/users') 
// app.put('/users/:id')
// app.delete('/users/:id')




