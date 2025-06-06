import {v2 as cloudinary} from 'cloudinary';

import {config} from 'dotenv';

config(); // Load environment variables from .env file

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;


// this file configures Cloudinary for image uploads in the application. 

// the coludinary configuration is set up using environment variables for security.
// The `v2` version of the Cloudinary library is imported and configured with the cloud name, API key, and API secret.
