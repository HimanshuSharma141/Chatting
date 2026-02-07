# Deploying Chatty to Vercel

This guide will walk you through deploying your full-stack Chatty application (Frontend + Backend) to Vercel.

## 1. Prerequisites

- A GitHub account with your project code pushed to a repository.
- A Vercel account (sign up at [vercel.com](https://vercel.com)).
- Your MongoDB connection string and other secrets ready.

## 2. Push Your Code

Ensure all your latest changes, including `vercel.json` and the updated `backend/src/index.js`, are pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

## 3. Import Project in Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`HimanshuSharma141/Chatting`).

## 4. Configure Project Settings

In the "Configure Project" screen, ensure the following settings:

- **Framework Preset**: Select **Vite** (Vercel should auto-detect this).
- **Root Directory**: Leave it as `.` (root).
- **Build Command**: Leave default (it will use `npm run build` from your root `package.json`).
- **Output Directory**: Set this to `frontend/dist`. **(Crucial Step)**
  - _Why?_ This tells Vercel that your static frontend files are located here after the build.

## 5. Set Environment Variables

Expand the **Environment Variables** section and add the following variables (copy values from your local `.env`):

| Key                     | Value                            |
| :---------------------- | :------------------------------- |
| `MONGODB_URI`           | `your_mongodb_connection_string` |
| `JWT_SECRET`            | `your_jwt_secret`                |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name`                |
| `CLOUDINARY_API_KEY`    | `your_api_key`                   |
| `CLOUDINARY_API_SECRET` | `your_api_secret`                |
| `NODE_ENV`              | `production`                     |

## 6. Deploy

Click **Deploy**.

Vercel will:

1. Install dependencies.
2. Run the build script (`npm run build --prefix frontend`).
3. Deploy the frontend from `frontend/dist`.
4. Deploy the backend API from `api/index.js` (mapped via `vercel.json`).

## 7. Troubleshooting

- **500 Errors on Login**: Check the **Logs** tab in Vercel for your deployment. Filter by "Functions" to see backend errors.
- **Socket.IO Issues**: Real-time features might be limited on Vercel's serverless platform (polling fallback is used).
