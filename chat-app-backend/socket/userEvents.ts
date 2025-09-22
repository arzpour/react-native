import { Socket, Server as SocketIOServer } from "socket.io";
import User from "../modals/User";
import { generateToken } from "../utils/token";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  socket.on("testSocket", (data) => {
    console.log("🚀 ~ registerUserEvents ~ data:", data);
    socket.emit("testSocket", { msg: "realtime updates!" });
  });

  socket.on(
    "updateProfile",
    async (data: { name: string; avatar?: string }) => {
      console.log("🚀 ~ registerUserEvents ~ data:", data);

      const userId = socket.data.userId;

      if (!userId) {
        return socket.emit("updateProfile", {
          success: false,
          msg: "Unauthorized",
        });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            name: data.name,
            avatar: data.avatar,
          },
          { new: true }
        );
        console.log("🚀 ~ registerUserEvents ~ updatedUser:", updatedUser);

        if (!updatedUser) {
          return socket.emit("updateProfile", {
            success: false,
            msg: "User not found",
          });
        }

        const newToken = generateToken(updatedUser);

        socket.emit("updateProfile", {
          success: true,
          data: { token: newToken },
          msg: "Profile updated successfully",
        });
      } catch (error) {
        console.log("🚀 ~ registerUserEvents ~ error:", error);
        return socket.emit("updateProfile", {
          success: false,
          msg: "Error updating profile",
        });
      }
    }
  );
}
