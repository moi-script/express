// app.js
const express = require('express');
const app = express();

// Import the mini-app
const userRoutes = require('./routes/users');

// MOUNTING THE ROUTER
// "If the URL starts with /users, send it to userRoutes"
app.use('/users', userRoutes); 

// app.listen(3000);


