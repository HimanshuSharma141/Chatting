// This is the entry point for the backend server
// It sets up an Express server that listens on port 5001
import express from 'express';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser'; // Middleware to parse cookies

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/message.route.js'; // Importing message routes if you have them defined
import cors from 'cors'; // Importing CORS middleware to handle cross-origin requests
import { app, server } from './lib/socket.js';

import path from 'path'; // Importing path to handle file paths


// Importing the auth routes from the auth.route.js file
dotenv.config(); // Load environment variables from .env file 


const PORT =  process.env.PORT;
const __dirname = path.resolve(); // Get the current directory path

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://localhost:5001',
    'http://127.0.0.1:5001',
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  exposedHeaders: ["set-cookie"],
})); // Middleware to enable CORS for the specified origins  

app.use(cookieParser()); // Middleware to parse cookies from the request headers
// Increase the payload size limit for JSON bodies to handle large images
app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON bodies simply can extract data from the request body 

app.use("/api/auth" , authRoutes)
app.use("/api/messages", messageRoutes); // Assuming you have message routes defined

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

   app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen (PORT, () => { 
  console.log('Server is running on port:' + PORT);
  connectDB(); // Connect to the database
});