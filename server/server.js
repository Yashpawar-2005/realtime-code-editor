import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http'; 
import { Server } from 'socket.io';  
import dotenv from 'dotenv';
import authroutes from './routes/authroutes.route.js';
import roomroutes from './routes/roomroutes.route.js';
import connectDB from './db/connect.db.js';

dotenv.config();

const app = express();


const port = process.env.VITE_PORT || 4000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

connectDB();

app.use('/api/auth', authroutes);
app.use('/api/room', roomroutes);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true,  
  }
});
io.on("connection", (socket) => {
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
  });
  socket.on("messageToRoom", ({ roomName, username, type }) => {
    socket.broadcast.to(roomName).emit("joinnednow", { username, type });
    console.log(`Message sent to room ${roomName}:`);
  });

  socket.on("leave-sync-room", (roomName) => {
    socket.leave(roomName);
    console.log(`User left sync room: ${roomName}`);
  });

  socket.on("sendingcode", (roomName, updatedEditorValue) => {
    io.to(roomName).emit("sync_editor_value", updatedEditorValue);
   
  });

  socket.on("chat-sent",({roomName,currenttext,username,type})=>{
    console.log(currenttext)
    const obj={
      "text":currenttext,
      "name":username,
      "type":type
    }
    socket.broadcast.to(roomName).emit("chat-update",obj);
  })
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    socket.broadcast.emit("user disconnected");
  });
});

app.get('/', (req, res) => {
  res.send("Server is ready");
});


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
