import axios from 'axios';

export const axiosInstance = axios.create({
    // Set the base URL for Axios requests.
    // If the application is running in development mode, use the local backend URL.
    // Otherwise, use the production backend URL relative to the current domain.
    baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5001/api': "/api",
    withCredentials: true, // This is important for sending cookies with requests
});