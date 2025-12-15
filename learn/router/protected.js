
// this is a tiny routes, that holds similar level 
// advantages, we can handle it easily such as global config


const express = require('express');
const router = express.Router();
import { verifyToken } from '../pipeline/verifyToken.js';
// const verifyToken = require('../middleware/auth'); // Your "Usher"

// --- THE GATEKEEPER ---
// This line applies Authentication to EVERYTHING in this file automatically.
// If they fail this check, they never reach the routes below.
router.use(verifyToken); 

// --- THE VIP ROUTES ---
// You don't need to add 'verifyToken' here anymore. It's already checked above.

router.get('/dashboard', (req, res) => {
  res.json({ msg: "Here is your dashboard data", user: req.user });
});

router.post('/delete-user', (req, res) => {
  // We know req.user exists because the Gatekeeper let them in
  res.json({ msg: "User deleted" });
});

router.get('/settings', (req, res) => {
  res.json({ msg: "User settings" });
});

module.exports = router;