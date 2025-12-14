const trimInputs = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    }
  }
  next();
};




const { body, validationResult } = require('express-validator');


// this helps to 
// check request body, params, header, 
// trim normalize, escape

// npm install express-validat\or

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





// Usage
app.use(express.json()); // Need this to read the body first
app.post('/signup', trimInputs, (req, res) => {
  // If user sent "  john@email.com  ", it is now "john@email.com"
  console.log(req.body.email); 
  res.send('Data received and cleaned!');
});