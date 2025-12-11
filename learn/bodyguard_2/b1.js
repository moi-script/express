const helmet = require('helmet');

// Use this at the VERY TOP of your code
app.use(helmet());  // deprecated 
// Result: It removes 'X-Powered-By' and adds headers like 'X-XSS-Protection' automatically.

// Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-scripts.com

// npm install helmet