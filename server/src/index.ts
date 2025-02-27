import express from "express";
import http from "node:http";
import cors from "cors";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import { roomHandler } from "./room";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  roomHandler(socket);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
