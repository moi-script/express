const rateLimit = require('express-rate-limit');


//  authorization after   
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: 'Too many login attempts, please try again after 15 minutes.'
});


// Apply ONLY to the login route
// app.post('/login', loginLimiter, (req, res) => {
//   res.send('Login successful');
// });

// npm install express-rate-limit




