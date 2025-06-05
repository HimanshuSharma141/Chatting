// This is the entry point for the backend server
// It sets up an Express server that listens on port 5001
import express from 'express';
import dotenv from 'dotenv'; 

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
// Importing the auth routes from the auth.route.js file

dotenv.config(); // Load environment variables from .env file 
const app = express();

const PORT =  process.env.PORT;

app.use("/api/auth" , authRoutes)

app.listen (PORT, () => { 
  console.log('Server is running on port:' + PORT);
  connectDB(); // Connect to the database
});