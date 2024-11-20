import Room from "../models/Room.model.js"
import User from "../models/user.model.js"

import { GoogleGenerativeAI } from "@google/generative-ai";

export const createroom =async(req,res)=>{
    try{
        const user=req.user
        const {joinRoomName:roomname,joinRole:data}=req.body
        const room =new Room({
            roomname:roomname,
            data:data
        })
        await room.save()
        const finduser= await User.findOne({_id:user._id})
        console.log("hitting")
        if(finduser.rooms.length>100){
            finduser.rooms.shift();
        }
        finduser.rooms.push(room._id);
        await finduser.save()
        res.send("done")
    }
    catch(error){
        res.send("errror in fetching data")
    }
}
export const getrooms=async(req,res)=>{
    try {
        const user=req.user
        const data=await User.findOne({_id:user._id}).populate("rooms")
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send("error in gettin  the data")
    }
}
export const aihelp=async(req,res)=>{
    try {
        const{editorValue,prompt:promp}=req.body
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${editorValue}  ${promp}`;
        
        const result = await model.generateContent(prompt);
        res.send(result.response.candidates[0].content.parts[0])

    } catch (error) {
        console.log(error)
        res.send("error in working of chatbot")
    }
}