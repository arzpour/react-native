import { Server as SocketIOServer, Socket } from "socket.io";
import Conversation from "../modals/Conversation";

export const registerChatEvents = async (
  io: SocketIOServer,
  socket: Socket
) => {
  socket.on("newConversation", async (data) => {
    console.log("🚀 ~ registerChatEvents ~ data:", data);

    try {
      if (data.type === "direct") {
        const existingConversation = await Conversation.findOne({
          type: "direct",
          participants: { $all: data.participants, $size: 2 },
        })
          .populate({
            path: "participants",
            select: "name avatar email",
          })
          .lean();
        console.log(
          "🚀 ~ registerChatEvents ~ existingConversation:",
          existingConversation
        );

        if (existingConversation) {
          socket.emit("newConversation", {
            success: true,
            data: { ...existingConversation, isNew: false },
          });
          return;
        }
      }

      const conversation = await Conversation.create({
        type: data.type,
        participants: data.participants,
        name: data.name ?? "",
        avatar: data.avatar ?? "",
        createdBy: socket.data.userId,
      });

      const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
        (s) => data.participants.includes(s.data.userId)
      );

      connectedSockets.forEach((participantSocket) => {
        participantSocket.join(conversation._id.toString());
      });

      const populatedConversation = await Conversation.findById(
        conversation._id
      )
        .populate({
          path: "participants",
          select: "name avatar email",
        })
        .lean();

      if (!populatedConversation) {
        throw new Error("Failed to populate conversation");
      }

      io.to(conversation._id.toString()).emit("newConversation", {
        success: true,
        data: { ...populatedConversation, isNew: true },
      });
    } catch (error) {
      console.log("🚀 ~ registerChatEvents ~ error:", error);
      socket.emit("newConversation", {
        success: false,
        msg: "Failed to create conversation",
      });
    }
  });
};
