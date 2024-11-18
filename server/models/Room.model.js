import mongoose from 'mongoose'
const roomSchema=new mongoose.Schema({
    roomname:{
        type:String,
        required:true,
    },
    data:{
        type:String,
    }
},{timestamps:true})
const Room=mongoose.model("Room",roomSchema)
export default Room