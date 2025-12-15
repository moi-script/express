import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// login generate the jwt token with timeout, also the refresh token 



// res.cookie('auth_token', jwtToken, { httpOnly: true, secure: true }); // JS cannot see this
// res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false }); // JS CAN see this
// res.cookie('refresh_token', jwtToken, { httpOnly: true, secure: true }); // JS cannot see this


// 
// // expected request 
// const api = axios.create({
//   baseURL: 'http://localhost:3000',
  
//   // 1. Tell Axios to send cookies (session/auth cookies)
//   withCredentials: true, 

//   // 2. Tell Axios the name of the cookie to read (set by your backend)
//   xsrfCookieName: 'XSRF-TOKEN', 

//   // 3. Tell Axios the name of the header to send back
//   xsrfHeaderName: 'x-xsrf-token', 
// });

// // Now, every request you make automatically includes the header!
// api.post('/update-profile', { name: 'John' })
//   .then(response => console.log('Success'));


const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Send cookies
  xsrfCookieName: 'XSRF-TOKEN', // Read this cookie from disk
  xsrfHeaderName: 'x-xsrf-token', // Put it in this header
});

// Response Interceptor for Silent Refresh
api.interceptors.response.use(
  (response) => response, // Return success
  async (error) => {
    const originalRequest = error.config;

    // If 401 (Access Token Expired) and we haven't retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1. Call Refresh Endpoint (Browser sends refresh cookie automatically)
        // Note: This endpoint MUST set new cookies in the response
        await api.post('/refresh-token');

        // 2. Retry the original request
        // Axios will automatically pick up the NEW cookies/headers
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is also invalid (e.g. expired 7 days)
        console.log("Session expired completely. Please login.");
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);



const generateCrsf = (req, res, next) => {
    const crsfToken = crypto.randomBytes(32).toString('hex');

    res.cookie('XSRF-TOKEN', crsfToken);
    next();
}

const validateCrsf = (req, res, next) => {
    const tokenFromHeader = req.header['x-xsrf-token'];
    const tokenFromCookie = req.cookies['XSRF-TOKEN'];

    if(tokenFromHeader && tokenFromHeader === tokenFromCookie){
        next();
    } else {
        res.status(403).json({
            message : "CSRF attacked detected"
        })
    }
}






const auth  = (req, res, next) => {

}