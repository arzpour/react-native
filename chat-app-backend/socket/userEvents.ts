import { Socket, Server as SocketIOServer } from "socket.io";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  socket.on("testSocket", (data) => {
    console.log("🚀 ~ registerUserEvents ~ data:", data);
    socket.emit("testSocket", { msg: "realtime updates!" });
  });
}
