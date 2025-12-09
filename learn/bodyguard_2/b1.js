const helmet = require('helmet');

// Use this at the VERY TOP of your code
app.use(helmet()); 
// Result: It removes 'X-Powered-By' and adds headers like 'X-XSS-Protection' automatically.



// npm install helmet