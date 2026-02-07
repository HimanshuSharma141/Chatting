import { app, connectDB } from "../backend/src/index.js";

export default async function handler(req, res) {
  await connectDB();
  app(req, res);
}
