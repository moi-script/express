// routes/users.js
const express = require('express');
const router = express.Router(); // Create the mini-app

// 1. Define routes relative to this router
// This is just '/' here, but it will become '/users/' later
router.get('/', (req, res) => {
  res.send('List of all users');
});

// This will become '/users/profile'
router.get('/profile', (req, res) => {
  res.send('User Profile');
});

module.exports = router; // Export it to be used elsewhere