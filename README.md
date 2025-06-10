# Chatty - Full Stack Real-Time Chat Application

Chatty is a modern full-stack chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for real-time communication. It features authentication, profile management (including profile picture upload), theme switching, and real-time online user status. The UI is designed with Tailwind CSS and DaisyUI for a beautiful, responsive experience.

## Features

- **User Authentication**: Secure signup, login, and logout with JWT and cookies.
- **Profile Management**: Update profile info and upload a profile picture (stored on Cloudinary).
- **Theme Switching**: Choose from multiple DaisyUI themes, with persistent theme selection.
- **Real-Time Messaging**: Send and receive messages instantly using Socket.IO.
- **Online Status**: See which users are online in real time (green dot indicator in sidebar).
- **Responsive UI**: Modern, mobile-friendly design with smooth transitions and skeleton loaders.
- **Persistent State**: User data and theme are persisted across reloads.

## Tech Stack

- **Frontend**: React, Zustand (state management), Tailwind CSS, DaisyUI, Axios, Socket.IO Client
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.IO, Cloudinary (for image uploads)
- **Authentication**: JWT, HTTP-only cookies

## Project Structure

```
Chat-App/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seeds/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constant/
│   │   ├── lib/
│   │   ├── Pages/
│   │   └── store/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for profile image uploads)

### Backend Setup

1. `cd backend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. `cd frontend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Sign up** for a new account or log in with existing credentials.
- **Update your profile** and upload a profile picture.
- **Switch themes** from the settings page.
- **Start chatting** with other users. Online users are indicated with a green dot.
- **Messages** are delivered in real time, and online status updates instantly.

## Environment Variables

- All sensitive credentials are stored in the `.env` file (see example above). Make sure `.env` is listed in `.gitignore` and never committed to version control.

## Scripts

- `npm run dev` - Start the development server (frontend or backend)
- `npm run build` - Build the frontend for production

## Security & Best Practices

- Uses HTTP-only cookies for secure authentication
- Passwords are hashed with bcrypt
- CORS is configured for local development
- Profile images are stored securely on Cloudinary

## License

This project is for educational purposes. Feel free to use and modify for your own learning!

---

**Enjoy chatting with Chatty!**
