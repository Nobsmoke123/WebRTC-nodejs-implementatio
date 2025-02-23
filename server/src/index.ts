import express from "express";
import http from "node:http";
import * as dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket);
  console.log("a user connected");
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
