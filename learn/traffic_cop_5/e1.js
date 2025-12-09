
const { createProxyMiddleware } = require('http-proxy-middleware');

// Forward any request starting with /api/python to localhost:5000
app.use('/api/python', createProxyMiddleware({ 
  target: 'http://localhost:5000', 
  changeOrigin: true 
}));


// npm install http-proxy-middleware

