
const { body, validationResult } = require('express-validator');

app.post('/register', 
  // 1. The Inspector Rules
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  
  // 2. The Middleware Logic
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Data is clean, proceed!
  },
  
  (req, res) => {
    res.send('User Registered!');
  }
);


// npm install express-validator