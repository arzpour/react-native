import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import { initializeSocket } from "./socket/socket";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT ?? 3000;

const server = http.createServer(app);

initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database Connected");

    server.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((error: string) => {
    console.log("🚀 ~ error:", error);
  });
