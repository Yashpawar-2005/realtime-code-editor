import cookieParser from "cookie-parser";
import express, { json } from "express";
const app=express();
import authroutes from './routes/authroutes.route.js'
import roomroutes from './routes/roomroutes.route.js'
import connectDB from "./db/connect.db.js";
import cors from 'cors'
import dotev from 'dotenv'

app.use(json());
const port =process.env.VITE_PORT||4000;
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
dotev.config();
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
  }));
  



connectDB();
app.use("/api/auth",authroutes)
app.use("/api/room",roomroutes)
app.get('/', (req, res) => {
    console.log('server hitthin')
    res.send("server is ready")

})

console.log(port)
app.listen(port);