// This is the entry point for the backend server
// It sets up an Express server that listens on port 5001
import express from 'express';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser'; // Middleware to parse cookies

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/message.route.js'; // Importing message routes if you have them defined
import cors from 'cors'; // Importing CORS middleware to handle cross-origin requests

// Importing the auth routes from the auth.route.js file
dotenv.config(); // Load environment variables from .env file 
const app = express();

const PORT =  process.env.PORT;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both common dev ports
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
})); // Middleware to enable CORS for the specified origins  

app.use(cookieParser()); // Middleware to parse cookies from the request headers
// Increase the payload size limit for JSON bodies to handle large images
app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON bodies simply can extract data from the request body 

app.use("/api/auth" , authRoutes)
app.use("/api/messages", messageRoutes); // Assuming you have message routes defined

app.listen (PORT, () => { 
  console.log('Server is running on port:' + PORT);
  connectDB(); // Connect to the database
});