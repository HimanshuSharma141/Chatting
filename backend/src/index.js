import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
console.log("Starting server...");
console.log(`PORT: ${process.env.PORT}`);
console.log(
  `MONGODB_URI: ${process.env.MONGODB_URI ? "Defined" : "Undefined"}`,
);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? "Defined" : "Undefined"}`);

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  const frontendDist = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDist));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const startServer = () => {
  server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
  });
};

if (!process.env.VERCEL) {
  startServer();
}

export { app, server, connectDB };
