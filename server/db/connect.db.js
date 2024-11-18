import mongoose from "mongoose";
    
const connectDB= async () => {
    try {
      const     mongourl="mongodb+srv://yash:realtime@cluster0.iugms.mongodb.net"
     const DB_NAME="yash"
       
      const connection=  await mongoose.connect(`${mongourl}/${DB_NAME}`)
      console.log("database connected omg")
    } catch (error) {
        console.log("Mongoose Connection error",error)
        process.exit(1)
    }
}
export default connectDB

