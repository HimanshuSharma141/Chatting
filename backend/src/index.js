// This is the entry point for the backend server
// It sets up an Express server that listens on port 5001
import express from 'express';

import authRoutes from './routes/auth.route.js';
// Importing the auth routes from the auth.route.js file

const app = express();

app.use("/api/auth" , authRoutes)

app.listen (5001, () => {
  console.log('Server is running on port 5001');
});