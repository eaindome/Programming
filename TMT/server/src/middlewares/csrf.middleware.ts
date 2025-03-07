import csrf from 'csurf';
import cookieParser from 'cookie-parser';

import app from "../app";

// Add to your main express app
app.use(cookieParser(process.env.COOKIE_SECRET));

// Use CSRF protection for routes that change state
const csrfProtection = csrf({ 
  cookie: { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  } 
});

export default csrfProtection;