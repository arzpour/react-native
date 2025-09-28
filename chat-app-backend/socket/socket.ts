import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server as SocketIOServer, Socket } from "socket.io";
import { registerUserEvents } from "./userEvents";
import { registerChatEvents } from "./chatEvents";
import Conversation from "../modals/Conversation";

dotenv.config();

export function initializeSocket(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: no token provided"));
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("Authentication error: invalid provided"));
        }

        // attach user data to socket
        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
      }
    );
  });

  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log(`User connected: ${userId}, username: ${socket.data.name}`);

    registerUserEvents(io, socket);
    registerChatEvents(io, socket);

    try {
      const conversations = await Conversation.find({
        participants: userId,
      }).select("_userId");

      conversations.forEach((conversation) => {
        socket.join(conversation._id.toString());
      });
    } catch (error) {
      console.log("🚀 ~ initializeSocket ~ error:", error);
    }

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${userId}`);
    });
  });

  return io;
}
