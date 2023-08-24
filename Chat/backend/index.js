require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
});

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Servidor está funcionando👨‍🚀🚀🚀...",
  });
});

const USERS = [];

io.on("connection", (socket) => {
  console.log(socket.id + " Entrou no chat");

  socket.on("disconnect", () => {
    console.log(socket.id + " Saiu do chat");
  });

  socket.on("message", (message) => {
    message.date = new Date().toLocaleString();
    console.log(message);
    io.emit("message", message);
  });

  socket.on("typing", (user) => {
    console.log(`${user} digitando...`);
    io.emit("typing", user);
  });

  socket.on("stop-typing", (user) => {
    io.emit("stop-typing", user);
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on *:${process.env.SERVER_PORT}`);
});
